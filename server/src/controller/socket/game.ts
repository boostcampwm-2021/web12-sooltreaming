import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/enter';
import { UPDOWN_START, UPDOWN_STOP } from 'sooltreaming-domain/constant/socketEvent';

const STATUS_NORMAL = 'STATUS_NORMAL';

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
    if (userKeys.length < 2 || rooms[code].game.title || rooms[code].status !== STATUS_NORMAL)
      return;

    rooms[code].game = { title: '업다운', host: startingSID };
    io.emit(UPDOWN_START, startingSID);
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
