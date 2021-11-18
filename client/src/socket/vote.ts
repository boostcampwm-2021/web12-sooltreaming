import { Socket } from 'socket.io-client';

const START_VOTING = 'START_VOTING';
const JUDGEMENT_ON = 'JUDGEMENT_ON';
const GET_DECISION = 'GET_DECISION';
const ONE_DECISION = 'ONE_DECISION';
const JUDGE_CLOSED = 'JUDGE_CLOSED';

const vote =
  (socket: Socket) =>
  ({ openJudgment, closeJudgement, addApprove, addReject }) => {
    // 투표 시작
    socket.on(JUDGEMENT_ON, ({ targetName, participants }) => {
      openJudgment({ targetName, participants });
    });
    // 투표 정보 가져오기
    socket.on(ONE_DECISION, ({ isApprove }) => {
      if (isApprove) addApprove();
      else addReject();
    });
    // 투표 끝났다
    socket.on(JUDGE_CLOSED, ({ targetName, percentage }) => {
      closeJudgement({ targetName, percentage });
    });

    const startVoting = (targetSID) => {
      if (!targetSID) return;
      socket.emit(START_VOTING, { targetSID });
    };
    // 투표를 진행하는 것
    const makeDecision = ({ isApprove }) => {
      socket.emit(GET_DECISION, { isApprove: true });
    };

    const disconnecting = () => {
      socket.off(JUDGEMENT_ON);
      socket.off(ONE_DECISION);
      socket.off(JUDGE_CLOSED);
    };
    return {
      startVoting,
      makeDecision,
      disconnecting,
    };
  };

export default vote;
