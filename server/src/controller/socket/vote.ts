import { createLog } from '@service/user';
import {
  VOTE_START,
  VOTE_DECISION,
  VOTE_GET_DECISION,
  VOTE_JUDGE_ON,
  VOTE_JUDGE_OFF,
  VOTE_PRISON_BREAK,
  CLOSEUP_ON,
} from 'sooltreaming-domain/constant/socketEvent';
import { VOTE_TIME } from 'sooltreaming-domain/constant/addition';
import { STATUS_VOTE_NORMAL, STATUS_VOTE_EXECUTING, STATUS_VOTE_VOTING } from '@src/constant';
import type { SocketPropType } from '@src/types';

const vote = ({ io, socket, rooms, targetInfo }: SocketPropType) => {
  const stopVoting = () => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;
    if (rooms[code].status !== STATUS_VOTE_VOTING) return;

    const voteInfo = rooms[code].vote;
    const { defendant: targetSID, cool, voteBox } = voteInfo;
    const resetTime = Date.now() + 3 * 60 * 1000;
    cool[targetSID] = resetTime;

    const votes = Object.values(voteBox);
    const total = votes.length;
    const approves = votes.filter((box) => box.isApprove).length;
    const percentage = Math.ceil((approves / total) * 100);

    if (percentage < 50) {
      rooms[code].status = STATUS_VOTE_NORMAL;
    } else {
      rooms[code].status = STATUS_VOTE_EXECUTING;
      rooms[code].closeupUser = targetSID;
      io.to(code).emit(CLOSEUP_ON, targetSID);

      createLog(rooms[code].users[targetSID].id, STATUS_VOTE_EXECUTING);
    }

    const targetName = rooms[code].users[targetSID]?.nickname ?? '';
    io.to(code).emit(VOTE_JUDGE_OFF, { targetSID, targetName, percentage, resetTime });
  };

  socket.on(VOTE_START, ({ targetSID }) => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;
    if (rooms[code].status !== STATUS_VOTE_NORMAL || rooms[code].game.title) return;

    const voteInfo = rooms[code].vote;
    const { cool } = voteInfo;
    if (!(targetSID in cool)) return;
    const coolTime = cool[targetSID];
    if (coolTime >= Date.now()) return;

    const userKeys = Object.keys(rooms[code].users);
    if (userKeys.length < 3) return;

    rooms[code].status = STATUS_VOTE_VOTING;
    voteInfo.defendant = targetSID;
    voteInfo.trial = setTimeout(stopVoting, VOTE_TIME * 1000);
    voteInfo.voteBox = userKeys.reduce((box, key) => {
      box[key] = {
        isApprove: false,
        isVoted: false,
      };
      return box;
    }, {});

    const targetName = rooms[code].users[targetSID]?.nickname ?? '';
    io.to(code).emit(VOTE_JUDGE_ON, { targetName, participants: userKeys.length });

    createLog(rooms[code].users[targetSID].id, VOTE_START);
  });

  socket.on(VOTE_DECISION, ({ isApprove }) => {
    const { code } = targetInfo;
    const sid = socket.id;
    if (!(code in rooms)) return;
    if (rooms[code].status !== STATUS_VOTE_VOTING) return;

    const voteInfo = rooms[code].vote;
    const { voteBox } = voteInfo;
    if (voteBox[sid].isVoted) return;

    voteBox[sid].isVoted = true;
    voteBox[sid].isApprove = isApprove;

    const leftVotes = Object.values(voteBox).filter((box) => !box.isVoted).length;
    if (!leftVotes) {
      clearTimeout(voteInfo.trial);
      voteInfo.trial = null;
      return stopVoting();
    }

    io.to(code).emit(VOTE_GET_DECISION, { isApprove });
  });

  socket.on('disconnect', () => {
    const { code } = targetInfo ?? {};
    if (!(code in rooms)) return;

    const voteInfo = rooms[code].vote;
    delete voteInfo.cool[socket.id] ?? {};

    if (rooms[code].status !== STATUS_VOTE_VOTING) return;
    rooms[code].status = STATUS_VOTE_NORMAL;
    clearTimeout(voteInfo.trial);
    voteInfo.trial = null;
    voteInfo.voteBox = {};
    voteInfo.defendant = '';

    io.to(code).emit(VOTE_PRISON_BREAK);
  });

  return { io, socket, rooms, targetInfo };
};

export default vote;
