import { useEffect, useMemo, useCallback, useState } from 'react';
import Socket from '@socket/socket';
import { useDispatch } from 'react-redux';
import { updateRoomVoteTime } from '@store/room';
import { setNoticeMessage } from '@store/notice';

const useVoteSocket = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [target, setTarget] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [approves, setApproves] = useState<number>(0);
  const [rejects, setRejects] = useState<number>(0);

  const openJudgment = useCallback(({ targetName, participants }) => {
    setIsOpen(true);
    setTarget(targetName);
    setTotal(participants);
    setApproves(0);
    setRejects(0);
  }, []);
  const resetJudgement = useCallback(() => {
    setIsOpen(false);
    setTarget('');
    setTotal(0);
    setApproves(0);
    setRejects(0);
  }, []);
  const closeJudgement = useCallback(({ targetSID, targetName, percentage, resetTime }) => {
    dispatch(updateRoomVoteTime({ sid: targetSID, time: resetTime }));
    dispatch(setNoticeMessage({ errorMessage: `${targetName}의 죽음에 ${percentage}% 찬성` }));
    resetJudgement();
  }, []);

  const addApprove = useCallback(() => setApproves((prev) => prev + 1), []);
  const addReject = useCallback(() => setRejects((prev) => prev + 1), []);

  const socket = useMemo(
    () => Socket.vote({ openJudgment, closeJudgement, addApprove, addReject, resetJudgement }),
    [],
  );
  useEffect(() => {
    return () => {
      socket.disconnecting();
    };
  }, []);

  const { startVoting, makeDecision } = socket;
  return { isOpen, target, total, approves, rejects, startVoting, makeDecision };
};

export default useVoteSocket;
