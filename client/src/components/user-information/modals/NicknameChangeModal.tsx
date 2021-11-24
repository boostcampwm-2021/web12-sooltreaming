import React, { useState, useEffect, useRef, useCallback } from 'react';
import Modal from '@components/custom/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { setNickname, setImage } from '@store/user';
import { RootState } from '@src/store';

import { API } from '@src/api';

import {
  Header,
  DeleteChangePressSection,
  ChangeData,
  NewNicknameInput,
  NicknameChangeAcceptIconWrapper,
  RejectIconWrapper,
  ProfileSquare,
  ProfileSquareWrapper,
  XButtonWrapper,
} from '@components/user-information/Information.style';
import { GreenXButtonIcon, CloseIcon, AcceptIcon } from '@src/components/icons';

type NicknameChangeModalType = {
  changeNicknameIsOpen: any;
  toggleNicknameJudgment: any;
};

const NicknameChangeModal: React.FC<NicknameChangeModalType> = ({
  changeNicknameIsOpen,
  toggleNicknameJudgment,
}) => {
  const dispatch = useDispatch();
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const imgUrl = useSelector((state: RootState) => state.user.imgUrl);
  const newNicknameData = useRef<HTMLInputElement>(null);
  const newImageData = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<any>(imgUrl);
  const [nickChanged, setNickChanged] = useState<boolean>(false);
  const [imgChanged, setImgChanged] = useState<boolean>(false);

  // 닉네임 변경 감지
  const checkChanged = (e) => {
    if (e.target.value !== nickname) setNickChanged(true);
    else setNickChanged(false);
  };

  // 이미지 프리뷰 업로드 함수
  const uploadImage = useCallback((e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const file = reader.result;
      if (file) setPreview(file);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  }, []);

  // 이미지 삭제 함수
  const deleteImage = useCallback(async () => {
    const dataTransfer = new DataTransfer();
    if (!newImageData.current || !newImageData.current?.files) return;
    else {
      newImageData.current.files = dataTransfer.files;
      setPreview('http://localhost:5000/public/uploads/HumanIcon.svg');
    }
  }, []);

  // 닉네임 변경 함수
  const changeNickname = async () => {
    const newNickname = newNicknameData.current?.value;
    if (newNickname === nickname || !newNickname) return;

    await API.call(API.TYPE.PATCH_USER_NICKNAME, newNickname);
    dispatch(setNickname(newNickname));
  };

  // 이미지 서버에 전송하는 함수
  const requestChangeUserImage = async () => {
    if (!newImageData.current) return;
    if (preview === imgUrl) return;

    // 서버에서 보내기
    const newImage = newImageData.current.files;
    const formData = new FormData();
    // newImage가 없을 때 FormData에 안넣기
    if (newImage && newImage[0]) formData.append('image', newImage[0]);
    const test = await API.call(API.TYPE.POST_USER_IMAGE, formData);
    dispatch(setImage(test));
  };

  const changeProfile = () => {
    if (!nickChanged && imgChanged) {
      Promise.all([requestChangeUserImage()]).then(() => {
        setNickChanged(false);
        setImgChanged(false);
        toggleNicknameJudgment();
      });
    } else if (nickChanged && !imgChanged) {
      Promise.all([changeNickname()]).then(() => {
        setNickChanged(false);
        setImgChanged(false);
        toggleNicknameJudgment();
      });
    } else if (nickChanged && imgChanged) {
      Promise.all([changeNickname(), requestChangeUserImage()]).then(() => {
        setNickChanged(false);
        setImgChanged(false);
        toggleNicknameJudgment();
      });
    }
  };

  // 닫기 버튼 클릭시
  const rejectProfile = () => {
    setNickChanged(false);
    setImgChanged(false);
    setPreview(imgUrl);
    toggleNicknameJudgment();
  };

  useEffect(() => {
    if (preview === imgUrl) setImgChanged(false);
    else setImgChanged(true);
  }, [preview]);

  return (
    <Modal
      isOpen={changeNicknameIsOpen}
      isRelative={false}
      renderCenter={true}
      absolutePos={{ top: '50%', left: '50%' }}
    >
      <Header>
        <h2>프로필 변경하기</h2>
      </Header>
      <ChangeData>
        <ProfileSquareWrapper>
          <ProfileSquare>
            <img src={preview} alt="" />
            <input
              ref={newImageData}
              type="file"
              style={{ width: 150, height: 150, opacity: 0, cursor: 'pointer' }}
              accept="image/jpeg, image/png"
              onChange={uploadImage}
            />
            <XButtonWrapper onClick={deleteImage}>
              <GreenXButtonIcon />
            </XButtonWrapper>
          </ProfileSquare>
        </ProfileSquareWrapper>

        <NewNicknameInput
          ref={newNicknameData}
          placeholder={'닉네임을 입력해주세요.'}
          defaultValue={nickname}
          onChange={checkChanged}
        />
      </ChangeData>
      <DeleteChangePressSection>
        <NicknameChangeAcceptIconWrapper
          onClick={changeProfile}
          nickChanged={nickChanged}
          imgChanged={imgChanged}
        >
          <AcceptIcon />
        </NicknameChangeAcceptIconWrapper>
        <RejectIconWrapper onClick={rejectProfile}>
          <CloseIcon />
        </RejectIconWrapper>
      </DeleteChangePressSection>
    </Modal>
  );
};

export default NicknameChangeModal;
