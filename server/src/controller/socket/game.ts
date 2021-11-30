import { createLog } from '@service/user';
import { UPDOWN_START, UPDOWN_STOP } from 'sooltreaming-domain/constant/socketEvent';
import { STATUS_VOTE_NORMAL } from '@src/constant';
import { UP_DOWN } from 'sooltreaming-domain/constant/gameName';
import type { SocketPropType } from '@src/types';

const game = ({ io, socket, rooms, targetInfo }: SocketPropType): SocketPropType => {
  socket.on(UPDOWN_START, (startingSID) => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;

    const userKeys = Object.keys(rooms[code].users);
    if (userKeys.length < 2 || rooms[code].game.title || rooms[code].status !== STATUS_VOTE_NORMAL)
      return;

    rooms[code].game = { title: UP_DOWN, host: startingSID };
    const randomNum = Math.floor(Math.random() * 50) + 1;

    io.to(code).emit(UPDOWN_START, startingSID, randomNum);
    createLog(rooms[code].users[startingSID].id, UPDOWN_START);
  });
  socket.on(UPDOWN_STOP, () => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;

    rooms[code].game = { title: '', host: '' };
    io.to(code).emit(GAME_STOP);
  });
  return { io, socket, rooms, targetInfo };
};

export default game;
