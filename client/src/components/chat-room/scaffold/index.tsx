import React, { useState } from 'react';
import { Header, PressSection } from './index.style.js';
import Modal from '@components/custom/Modal';
import TimerBomb from '@components/chat-room/scaffold/TimerBomb';

const Scaffold: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [target, setTarget] = useState<string>('');

  const openJudgment = () => {
    setIsOpen(true);
    setTarget('아무개');
  };

  const closeJudgment = () => {
    setIsOpen(false);
    setTarget('');
  };

  return (
    <>
      <button onClick={openJudgment}>심판 테스트</button>
      <Modal
        isOpen={isOpen}
        isRelative={false}
        renderCenter={true}
        absolutePos={{ top: '50%', left: '50%' }}
      >
        <Header>
          <h2>
            <span>{target}</span>을(를) 처분할까요?
          </h2>
          <TimerBomb />
        </Header>
        <PressSection>
          <button onClick={closeJudgment}>
            <img src="/images/agree.png" alt="agree" />
          </button>
          <button onClick={closeJudgment}>
            <img src="/images/disagree.png" alt="disagree" />
          </button>
        </PressSection>
      </Modal>
    </>
  );
};

export default Scaffold;
