import React, { useState, useRef, useCallback } from 'react';
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
  AcceptIconWrapper,
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

  // 이미지 업로드 함수
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
    newImageData.current.files = dataTransfer.files;
    setPreview('http://localhost:5000/public/uploads/HumanIcon.svg');
  }, []);

  // 닉네임 변경 함수
  const changeNickname = async () => {
    const newNickname = newNicknameData.current?.value;
    if (newNickname === nickname || !newNickname) return;

    await API.call(API.TYPE.PATCH_USER_NICKNAME, newNickname);
    dispatch(setNickname(newNickname));
  };

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

  const changeProfile = (e) => {
    Promise.all([changeNickname(), requestChangeUserImage()]).then(() => {
      toggleNicknameJudgment();
    });
  };

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
        />
      </ChangeData>
      <DeleteChangePressSection>
        <AcceptIconWrapper onClick={changeProfile}>
          <AcceptIcon />
        </AcceptIconWrapper>
        <RejectIconWrapper onClick={toggleNicknameJudgment}>
          <CloseIcon />
        </RejectIconWrapper>
      </DeleteChangePressSection>
    </Modal>
  );
};

export default NicknameChangeModal;
