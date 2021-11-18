import React, { useState, useEffect } from 'react';
import { Wrapper } from '@components/room/scaffold/index.style';
import useVote from '@hooks/socket/useVote';
import Modal from '@components/custom/Modal';
import TimerBomb from '@src/components/room/scaffold/TimerBomb';
import VotePresser from '@src/components/room/scaffold/VotePresser';
import Voters from '@src/components/room/scaffold/Voters';

type ScaffoldPropTypes = {
  startVoteRef: React.MutableRefObject<Function>;
};

const Scaffold: React.FC<ScaffoldPropTypes> = ({ startVoteRef }) => {
  const [isVote, setIsVote] = useState<boolean>(false);
  const { isOpen, target, total, approves, rejects, startVoting, makeDecision } = useVote();

  useEffect(() => {
    if (!isOpen) setIsVote(false);
  }, [isOpen]);

  useEffect(() => {
    startVoteRef.current = startVoting;
  }, []);

  const sendDecision = (isApprove) => () => {
    makeDecision({ isApprove });
    setIsVote(true);
  };

  const position = isVote ? '30px' : '50%';
  return (
    <Modal
      isOpen={isOpen}
      isRelative={false}
      renderCenter={!isVote}
      absolutePos={{ top: position, left: position }}
    >
      <Wrapper isVote={isVote}>
        <TimerBomb />
        <VotePresser isVote={isVote} target={target} sendDecision={sendDecision} />
        <Voters total={total} approves={approves} rejects={rejects} />
      </Wrapper>
    </Modal>
  );
};

export default Scaffold;
