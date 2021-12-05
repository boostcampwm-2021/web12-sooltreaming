import React, { useState, useEffect, useRef, useCallback } from 'react';
import Modal from '@components/custom/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { setNickname, setImage } from '@store/user';
import { RootState } from '@src/store';

import { API } from '@src/api';

import {
  ModalContents,
  NewNicknameInput,
  ImageContainer,
  DeleteBox,
  AcceptButton,
  CloseButton,
  ButtonContainer,
} from '@components/user-information/modals/NickChangeModal.style';
import { Header, Button } from '@components/user-information/modals/index.style';
import { GreenXButtonIcon, ChangeNicknameIcon } from '@components/icons';
import {
  FILE_PUBLIC_URL,
  DEFAULT_PROFILE_IMAGE,
  NCP_ENDPOINT,
  NCP_BUCKET,
} from 'sooltreaming-domain/constant/addition';

const NickChangeModal: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const imgUrl = useSelector((state: RootState) => state.user.imgUrl);
  const newNicknameData = useRef<HTMLInputElement>(null);
  const newImageData = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<any>(imgUrl);
  const [nickChanged, setNickChanged] = useState<boolean>(false);
  const [imgChanged, setImgChanged] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 모달 닫기
  const closeModal = () => setIsOpen(false);

  // 닉네임 변경 감지
  const checkChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value !== nickname) setNickChanged(true);
    else setNickChanged(false);
  };

  // 이미지 프리뷰 업로드 함수
  const uploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const file = reader.result;
      if (file) setPreview(file);
    };
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  }, []);

  // 이미지 삭제 함수
  const deleteImage = useCallback(async (): Promise<void> => {
    const dataTransfer = new DataTransfer();
    if (!newImageData.current || !newImageData.current?.files) return;
    else {
      newImageData.current.files = dataTransfer.files;
      setPreview(`${NCP_ENDPOINT}/${NCP_BUCKET}${FILE_PUBLIC_URL}/${DEFAULT_PROFILE_IMAGE}`);
    }
  }, []);

  // 닉네임 변경 함수
  const changeNickname = async (): Promise<void> => {
    const newNickname = newNicknameData.current?.value;
    if (newNickname === nickname || !newNickname) return;

    await API.call(API.TYPE.PATCH_USER_NICKNAME, newNickname);
    dispatch(setNickname(newNickname));
  };

  // 이미지 서버에 전송하는 함수
  const requestChangeUserImage = async (): Promise<void> => {
    if (!newImageData.current) return;
    if (preview === imgUrl) return;

    // 서버에서 보내기
    const newImage = newImageData.current.files;
    const formData = new FormData();
    // newImage가 없을 때 FormData에 안넣기
    if (newImage && newImage[0]) formData.append('image', newImage[0]);
    const result = await API.call(API.TYPE.POST_USER_IMAGE, formData);
    if (!result) return;
    const { imgUrl: newImgUrl } = result;
    dispatch(setImage(newImgUrl));
  };

  const profileChangeCallback = (): void => {
    setNickChanged(false);
    setImgChanged(false);
    closeModal();
  };

  const changeProfile = (): void => {
    if (!nickChanged && imgChanged) {
      Promise.all([requestChangeUserImage()]).then(() => {
        profileChangeCallback();
      });
    } else if (nickChanged && !imgChanged) {
      Promise.all([changeNickname()]).then(() => {
        profileChangeCallback();
      });
    } else if (nickChanged && imgChanged) {
      Promise.all([changeNickname(), requestChangeUserImage()]).then(() => {
        profileChangeCallback();
      });
    }
  };

  // 닫기 버튼 클릭시
  const rejectProfile = (): void => {
    setNickChanged(false);
    setImgChanged(false);
    setPreview(imgUrl);
    closeModal();
  };

  useEffect(() => {
    if (preview === imgUrl) setImgChanged(false);
    else setImgChanged(true);
  }, [preview]);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <ChangeNicknameIcon />
      </Button>
      <Modal
        isOpen={isOpen}
        isRelative={false}
        renderCenter={true}
        absolutePos={{ top: '50%', left: '50%' }}
      >
        <Header>프로필 변경하기</Header>
        <ModalContents>
          <ImageContainer>
            <img src={preview} alt="" />
            <input
              ref={newImageData}
              type="file"
              style={{ width: 150, height: 150, opacity: 0, cursor: 'pointer' }}
              accept="image/jpeg, image/png"
              onChange={uploadImage}
            />
            <DeleteBox onClick={deleteImage}>
              <GreenXButtonIcon />
            </DeleteBox>
          </ImageContainer>

          <NewNicknameInput
            ref={newNicknameData}
            placeholder={'닉네임을 입력해주세요.'}
            defaultValue={nickname}
            onChange={checkChanged}
            maxLength={12}
          />
        </ModalContents>
        <ButtonContainer>
          <AcceptButton onClick={changeProfile} disabled={!(nickChanged || imgChanged)}>
            확인
          </AcceptButton>
          <CloseButton onClick={rejectProfile}>닫기</CloseButton>
        </ButtonContainer>
      </Modal>
    </>
  );
};

export default NickChangeModal;
