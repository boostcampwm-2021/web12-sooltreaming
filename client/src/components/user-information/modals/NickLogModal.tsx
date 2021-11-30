import React, { useState } from 'react';
import Modal from '@components/custom/Modal';
import { ModalContents, LogData } from '@components/user-information/modals/NickLogModal.style';
import { Header, Button, CloseBox } from '@components/user-information/modals/index.style';
import { HistoryIcon, GreenXButtonIcon } from '@components/icons';
import type { NicknameLogType } from '@components/user-information/information';

type NickLogModalType = {
  nickname: string;
  nicknameLog: NicknameLogType;
};

const NickLogModal: React.FC<NickLogModalType> = ({ nickname, nicknameLog }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <HistoryIcon />
      </Button>
      <Modal
        isOpen={isOpen}
        isRelative={false}
        renderCenter={true}
        absolutePos={{ top: '50%', left: '50%' }}
      >
        <Header>
          <span>{nickname}</span> 님의 닉네임 변경 내역
        </Header>
        <ModalContents>
          {nicknameLog.map(({ nickname: prevNickname }) => (
            <LogData>{prevNickname}</LogData>
          ))}
        </ModalContents>
        <CloseBox onClick={() => setIsOpen(false)}>
          <GreenXButtonIcon />
        </CloseBox>
      </Modal>
    </>
  );
};

export default NickLogModal;
