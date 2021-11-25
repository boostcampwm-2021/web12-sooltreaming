import React from 'react';
import Modal from '@components/custom/Modal';
import {
  Header,
  CheckPressSection,
  HistoryData,
  AcceptIconWrapper,
} from '@components/user-information/Information.style';
import { AcceptIcon } from '@src/components/icons';

import type { NicknameLogType } from '@components/user-information/Information';

type nicknameLogModalType = {
  historyIsOpen: boolean;
  nickname: string;
  nicknameLog: Array<NicknameLogType>;
  toggleHistoryJudgment: any;
};

const NicknameLogModal: React.FC<nicknameLogModalType> = ({
  historyIsOpen,
  nickname,
  nicknameLog,
  toggleHistoryJudgment,
}) => {
  return (
    <Modal
      isOpen={historyIsOpen}
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
        {nicknameLog.map(({ nickname: prevNickname }, index) => (
          <p>{prevNickname}</p>
        ))}
      </HistoryData>
      <CheckPressSection>
        <AcceptIconWrapper onClick={toggleHistoryJudgment}>
          <AcceptIcon />
        </AcceptIconWrapper>
      </CheckPressSection>
    </Modal>
  );
};

export default NicknameLogModal;
