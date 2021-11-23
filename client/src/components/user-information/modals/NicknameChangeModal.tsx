import React, { useRef, useCallback } from 'react';
import Modal from '@components/custom/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { setNickname } from '@store/user';
import { RootState } from '@src/store';

import { API } from '@src/api';

import {
  Header,
  DeleteChangePressSection,
  ChangeNicknameData,
  NewNicknameInput,
} from '@components/user-information/Information.style';

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
  const newNicknameData = useRef<HTMLInputElement>(null);

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
        <h2>닉네임 변경하기</h2>
      </Header>
      <ChangeNicknameData>
        <NewNicknameInput ref={newNicknameData} placeholder={'변경할 닉네임을 입력해주세요.'} />
      </ChangeNicknameData>
      <DeleteChangePressSection>
        <button onClick={changeNickname}>
          <img src="/images/check.png" alt="check" />
        </button>
        <button onClick={toggleNicknameJudgment}>
          <img src="/images/deny.png" alt="deny" />
        </button>
      </DeleteChangePressSection>
    </Modal>
  );
};

export default NicknameChangeModal;
