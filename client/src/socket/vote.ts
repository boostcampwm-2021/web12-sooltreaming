import { Socket } from 'socket.io-client';
import {
  VOTE_START,
  VOTE_DECISION,
  VOTE_GET_DECISION,
  VOTE_JUDGE_ON,
  VOTE_JUDGE_OFF,
  VOTE_PRISON_BREAK,
} from 'sooltreaming-domain/constant/socketEvent';

const vote =
  (socket: Socket) =>
  ({ openJudgment, closeJudgement, addApprove, addReject, resetJudgement }) => {
    socket.on(VOTE_JUDGE_ON, ({ targetName, participants }) => {
      openJudgment({ targetName, participants });
    });
    socket.on(VOTE_GET_DECISION, ({ isApprove }) => {
      if (isApprove) addApprove();
      else addReject();
    });
    socket.on(VOTE_JUDGE_OFF, ({ targetSID, targetName, percentage, resetTime }) => {
      closeJudgement({ targetSID, targetName, percentage, resetTime });
    });
    socket.on(VOTE_PRISON_BREAK, resetJudgement);

    const startVoting = (targetSID) => {
      if (!targetSID) return;
      socket.emit(VOTE_START, { targetSID });
    };
    const makeDecision = ({ isApprove }) => {
      socket.emit(VOTE_DECISION, { isApprove });
    };

    const disconnecting = () => {
      socket.off(VOTE_GET_DECISION);
      socket.off(VOTE_JUDGE_ON);
      socket.off(VOTE_JUDGE_OFF);
      socket.off(VOTE_PRISON_BREAK);
    };
    return {
      startVoting,
      makeDecision,
      disconnecting,
    };
  };

export default vote;
