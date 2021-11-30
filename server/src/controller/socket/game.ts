import { Socket } from 'socket.io';
import { createLog } from '@service/user';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/enter';
import { UPDOWN_START, UPDOWN_STOP } from 'sooltreaming-domain/constant/socketEvent';
import { STATUS_VOTE_NORMAL } from '@src/constant';
import { UP_DOWN } from 'sooltreaming-domain/constant/gameName';

const game = ({
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
  socket.on(UPDOWN_START, (startingSID) => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;

    const userKeys = Object.keys(rooms[code].users);
    if (userKeys.length < 2 || rooms[code].game.title || rooms[code].status !== STATUS_VOTE_NORMAL)
      return;

    rooms[code].game = { title: UP_DOWN, host: startingSID };
    const randomNum = Math.floor(Math.random() * 50) + 1;

    io.emit(UPDOWN_START, startingSID, randomNum);
    createLog(rooms[code].users[startingSID].id, UPDOWN_START);
  });
  socket.on(UPDOWN_STOP, () => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;

    rooms[code].game = { title: '', host: '' };
    io.emit(UPDOWN_STOP);
  });
  return { io, socket, rooms, targetInfo };
};

export default game;
