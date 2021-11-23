import React, { useState, useRef, useCallback } from 'react';
import Modal from '@components/custom/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { setNickname } from '@store/user';
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
import { AcceptIcon, GreenXButtonIcon, RejectIcon } from '@src/components/icons';

type NicknameChangeModal = {
  changeNicknameIsOpen: any;
  toggleNicknameJudgment: any;
};

const NicknameChangeModal: React.FC<NicknameChangeModal> = ({
  changeNicknameIsOpen,
  toggleNicknameJudgment,
}) => {
  const dispatch = useDispatch();
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const imgUrl = useSelector((state: RootState) => state.user.imgUrl);
  const newNicknameData = useRef<HTMLInputElement>(null);
  const inputImage = useRef<HTMLInputElement>(null);
  const [fileUrl, setFileUrl] = useState<string>(imgUrl);

  // 이미지 업로드 함수
  const uploadImage = async () => {};

  // 닉네임 변경 함수
  const changeNickname = useCallback(() => {
    const newNickname = newNicknameData.current?.value;
    if (newNickname === nickname || !newNickname) return;

    const requestChangeUserNickname = async () => {
      await API.call(API.TYPE.PATCH_USER_NICKNAME, newNickname);
      toggleNicknameJudgment();
      dispatch(setNickname(newNickname));
    };
    requestChangeUserNickname();
  }, []);

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
          <ProfileSquare fileUrl={fileUrl}>
            <form action="https://localhost:5000/image" method="post" encType="multipart/form-data">
              <input
                type="file"
                style={{ width: 150, height: 150, opacity: 0, cursor: 'pointer' }}
                accept="image/jpeg, image/png"
                onChange={uploadImage}
              />
            </form>
            <XButtonWrapper>
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
        <AcceptIconWrapper onClick={changeNickname}>
          <AcceptIcon />
        </AcceptIconWrapper>
        <RejectIconWrapper onClick={toggleNicknameJudgment}>
          <RejectIcon />
        </RejectIconWrapper>
      </DeleteChangePressSection>
    </Modal>
  );
};

export default NicknameChangeModal;
