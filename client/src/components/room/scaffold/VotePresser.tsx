import React from 'react';
import { Title, PressSection } from '@src/components/room/scaffold/VotePresser.style';

const VotePresser = ({ isVote, target, sendDecision }): React.ReactElement => {
  if (isVote) return <></>;
  return (
    <>
      <Title>
        <span>{target}</span>을(를) 처분할까요?
      </Title>
      <PressSection>
        <button onClick={sendDecision(true)}>
          <img src="/images/agree.png" alt="agree" />
        </button>
        <button onClick={sendDecision(false)}>
          <img src="/images/disagree.png" alt="disagree" />
        </button>
      </PressSection>
    </>
  );
};

export default VotePresser;
