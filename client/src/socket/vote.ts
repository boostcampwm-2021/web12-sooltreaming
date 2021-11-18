import { Socket } from 'socket.io-client';

const START_VOTING = 'START_VOTING';
const JUDGEMENT_ON = 'JUDGEMENT_ON';
const GET_DICISION = 'GET_DICISION';
const ONE_DECISION = 'ONE_DECISION';
const JUDGE_CLOSED = 'JUDGE_CLOSED';

const vote =
  (socket: Socket) =>
  ({}) => {
    // 투표 시작
    socket.on(JUDGEMENT_ON, ({ targetSID, participants }) => {});
    // 투표 정보 가져오기
    socket.on(ONE_DECISION, ({ isApprove }) => {});
    // 투표 끝났다
    socket.on(JUDGE_CLOSED, ({ targetSID, percentage }) => {});

    // 투표를 여는 것
    socket.emit(START_VOTING, { targetSID: '' });
    // 투표를 진행하는 것
    socket.emit(GET_DICISION, { isApprove: true });

    const disconnecting = () => {
      socket.off(JUDGEMENT_ON);
      socket.off(ONE_DECISION);
      socket.off(JUDGE_CLOSED);
    };
    return {
      disconnecting,
    };
  };

export default vote;
