import React, { useState, useEffect } from 'react';
import { Content } from '@components/room/scaffold/index.style';
import useVoteSocket from '@hooks/socket/useVoteSocket';
import Modal from '@components/custom/Modal';
import TimerBomb from '@src/components/room/scaffold/TimerBomb';
import VotePresser from '@src/components/room/scaffold/VotePresser';
import Voters from '@src/components/room/scaffold/Voters';
import type { ScaffoldPropType } from '@ts-types/components/room';

const Scaffold: React.FC<ScaffoldPropType> = ({ startVoteRef }): React.ReactElement => {
  const [isVote, setIsVote] = useState<boolean>(false);
  const { isOpen, target, total, approves, rejects, startVoting, makeDecision } = useVoteSocket();

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
      <Content isVote={isVote}>
        <TimerBomb />
        <VotePresser isVote={isVote} target={target} sendDecision={sendDecision} />
        <Voters total={total} approves={approves} rejects={rejects} />
      </Content>
    </Modal>
  );
};

export default Scaffold;
