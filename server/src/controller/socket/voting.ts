import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/entering';

const START_VOTING = 'START_VOTING';
const JUDGEMENT_ON = 'JUDGEMENT_ON';
const GET_DICISION = 'GET_DICISION';
const ONE_DECISION = 'ONE_DECISION';
const JUDGE_CLOSED = 'JUDGE_CLOSED';

const CLOSEUP = 'CLOSEUP';

const VOTE_TIME = 60000;

const voting = ({
  io,
  socket,
  rooms,
  targetInfo,
}: {
  io: any;
  socket: Socket;
  rooms: roomType;
  targetInfo: TargetInfoType;
}) => {
  const stopVoting = () => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;
    if (rooms[code].status !== 'VOTING') return;

    const vote = rooms[code].vote;
    const { defendant: targetSID, cool, voteBox } = vote;
    cool[targetSID] = Date.now() + 3 * 60 * 1000;

    const votes = Object.values(voteBox);
    const total = votes.length;
    const approves = votes.filter((box) => !box.isApprove).length;
    const percentage = Math.ceil((approves / total) * 100);
    if (percentage < 50) {
      rooms[code].status = 'NORMAL';
      // 원한다면 취소 메세지
      return;
    } else {
      rooms[code].status = 'EXECUTING';
      rooms[code].closeupUser = targetSID;
      io.to(code).emit(CLOSEUP, targetSID);
    }

    io.to(code).emit(JUDGE_CLOSED, { targetSID, percentage });
  };

  socket.on(START_VOTING, ({ targetSID }) => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;
    if (rooms[code].status !== 'NORMAL') return;

    const vote = rooms[code].vote;
    const { cool } = vote;
    if (!(targetSID in cool)) return;
    const coolTime = cool[targetSID];
    if (coolTime >= Date.now()) return;

    const userKeys = Object.keys(rooms[code].users);
    rooms[code].status = 'VOTING';
    vote.defendant = targetSID;
    vote.trial = setTimeout(stopVoting, VOTE_TIME);
    vote.voteBox = userKeys.reduce((box, key) => {
      const isDelator = key === socket.id;
      box[key] = {
        isApprove: isDelator,
        isVoted: isDelator,
      };
      return box;
    }, {});

    io.to(code).emit(JUDGEMENT_ON, { targetSID, participants: userKeys.length });
  });

  socket.on(GET_DICISION, ({ isApprove }) => {
    const { code } = targetInfo;
    const sid = socket.id;
    if (!(code in rooms)) return;
    if (rooms[code].status !== 'VOTING') return;

    const vote = rooms[code].vote;
    const { voteBox } = rooms[code].vote;
    if (voteBox[sid].isVoted) return;

    voteBox[sid].isVoted = true;
    voteBox[sid].isApprove = isApprove;

    // 남은 투표수가 없다면 멈추기
    const leftVotes = Object.values(voteBox).filter((box) => !box.isVoted).length;
    if (!leftVotes) {
      clearTimeout(vote.trial);
      vote.trial = null;
      return stopVoting();
    }

    io.to(code).emit(ONE_DECISION, { isApprove });
  });

  socket.on('disconnect', () => {
    const { code } = targetInfo ?? {};
    if (!(code in rooms)) return;

    const vote = rooms[code].vote;
    delete vote.cool[socket.id] ?? {};

    if (rooms[code].status !== 'VOTING') return;
    clearTimeout(vote.trial);
    vote.trial = null;
    vote.voteBox = {};
    vote.defendant = '';
  });

  return { io, socket, rooms, targetInfo };
};

export default voting;
