import { Socket } from 'socket.io-client';
import {
  START_VOTING,
  JUDGEMENT_ON,
  GET_DECISION,
  ONE_DECISION,
  JUDGE_CLOSED,
  PRISON_BREAK,
} from 'sooltreaming-domain/constant/socketEvent';

const vote =
  (socket: Socket) =>
  ({ openJudgment, closeJudgement, addApprove, addReject, resetJudgement }) => {
    socket.on(JUDGEMENT_ON, ({ targetName, participants }) => {
      openJudgment({ targetName, participants });
    });
    socket.on(ONE_DECISION, ({ isApprove }) => {
      if (isApprove) addApprove();
      else addReject();
    });
    socket.on(JUDGE_CLOSED, ({ targetSID, targetName, percentage, resetTime }) => {
      closeJudgement({ targetSID, targetName, percentage, resetTime });
    });
    socket.on(PRISON_BREAK, resetJudgement);

    const startVoting = (targetSID) => {
      if (!targetSID) return;
      socket.emit(START_VOTING, { targetSID });
    };
    const makeDecision = ({ isApprove }) => {
      socket.emit(GET_DECISION, { isApprove });
    };

    const disconnecting = () => {
      socket.off(JUDGEMENT_ON);
      socket.off(ONE_DECISION);
      socket.off(JUDGE_CLOSED);
      socket.off(PRISON_BREAK);
    };
    return {
      startVoting,
      makeDecision,
      disconnecting,
    };
  };

export default vote;
