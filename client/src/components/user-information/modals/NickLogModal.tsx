import React, { useState } from 'react';
import Modal from '@components/custom/Modal';
import {
  CheckPressSection,
  HistoryData,
  AcceptIconWrapper,
} from '@components/user-information/modals/NickLogModal.style';
import { Header, Button } from '@components/user-information/modals/index.style';
import { HistoryIcon, AcceptIcon } from '@components/icons';
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
          <h2>
            <span>{nickname}</span> 님의 닉네임 변경 내역
          </h2>
        </Header>
        <HistoryData>
          {nicknameLog.map(({ nickname: prevNickname }) => (
            <p>{prevNickname}</p>
          ))}
        </HistoryData>
        <CheckPressSection>
          <AcceptIconWrapper onClick={() => setIsOpen(false)}>
            <AcceptIcon />
          </AcceptIconWrapper>
        </CheckPressSection>
      </Modal>
    </>
  );
};

export default NickLogModal;
