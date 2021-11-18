import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/entering';

const STATUS_NORMAL = 'STATUS_NORMAL';
const STATUS_EXECUTING = 'STATUS_EXECUTING';
const STATUS_VOTING = 'STATUS_VOTING';

const START_VOTING = 'START_VOTING';
const JUDGEMENT_ON = 'JUDGEMENT_ON';
const GET_DECISION = 'GET_DECISION';
const ONE_DECISION = 'ONE_DECISION';
const JUDGE_CLOSED = 'JUDGE_CLOSED';
const PRISON_BREAK = 'PRISON_BREAK';

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
    if (rooms[code].status !== STATUS_VOTING) return;

    const vote = rooms[code].vote;
    const { defendant: targetSID, cool, voteBox } = vote;
    const resetTime = Date.now() + 3 * 60 * 1000;
    cool[targetSID] = resetTime;

    const votes = Object.values(voteBox);
    const total = votes.length;
    const approves = votes.filter((box) => box.isApprove).length;
    const percentage = Math.ceil((approves / total) * 100);

    if (percentage < 50) {
      rooms[code].status = STATUS_NORMAL;
      // TODO: 원한다면 취소 메세지
    } else {
      rooms[code].status = STATUS_EXECUTING;
      rooms[code].closeupUser = targetSID;
      io.to(code).emit(CLOSEUP, targetSID);
    }

    const targetName = rooms[code].users[targetSID]?.nickname ?? '';
    io.to(code).emit(JUDGE_CLOSED, { targetSID, targetName, percentage, resetTime });
  };

  socket.on(START_VOTING, ({ targetSID }) => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;
    if (rooms[code].status !== STATUS_NORMAL) return;

    const vote = rooms[code].vote;
    const { cool } = vote;
    if (!(targetSID in cool)) return;
    const coolTime = cool[targetSID];
    if (coolTime >= Date.now()) return;

    const userKeys = Object.keys(rooms[code].users);
    if (userKeys.length < 3) return;

    rooms[code].status = STATUS_VOTING;
    vote.defendant = targetSID;
    vote.trial = setTimeout(stopVoting, VOTE_TIME);
    vote.voteBox = userKeys.reduce((box, key) => {
      box[key] = {
        isApprove: false,
        isVoted: false,
      };
      return box;
    }, {});

    const targetName = rooms[code].users[targetSID]?.nickname ?? '';
    io.to(code).emit(JUDGEMENT_ON, { targetName, participants: userKeys.length });
  });

  socket.on(GET_DECISION, ({ isApprove }) => {
    const { code } = targetInfo;
    const sid = socket.id;
    if (!(code in rooms)) return;
    if (rooms[code].status !== STATUS_VOTING) return;

    const vote = rooms[code].vote;
    const { voteBox } = rooms[code].vote;
    if (voteBox[sid].isVoted) return;

    voteBox[sid].isVoted = true;
    voteBox[sid].isApprove = isApprove;

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

    if (rooms[code].status !== STATUS_VOTING) return;
    rooms[code].status = STATUS_NORMAL;
    clearTimeout(vote.trial);
    vote.trial = null;
    vote.voteBox = {};
    vote.defendant = '';

    io.to(code).emit(PRISON_BREAK);
  });

  return { io, socket, rooms, targetInfo };
};

export default voting;
