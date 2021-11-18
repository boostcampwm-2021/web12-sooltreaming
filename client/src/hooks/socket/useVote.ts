import { useEffect, useMemo, useCallback, useState } from 'react';
import Socket from '@socket/socket';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@src/store';
// import { addStreams } from '@store/room';

const useVote = () => {
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
  const closeJudgement = useCallback(({ targetName, percentage }) => {
    setIsOpen(false);
    setTarget('');
    setTotal(0);
    setApproves(0);
    setRejects(0);
  }, []);

  const addApprove = useCallback(() => setApproves((prev) => prev + 1), []);
  const addReject = useCallback(() => setRejects((prev) => prev + 1), []);

  const socket = useMemo(
    () => Socket.vote({ openJudgment, closeJudgement, addApprove, addReject }),
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

export default useVote;
