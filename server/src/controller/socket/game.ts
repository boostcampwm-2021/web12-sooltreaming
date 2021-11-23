import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/enter';
import { UPDOWN_START, UPDOWN_STOP } from 'sooltreaming-domain/constant/socketEvent';

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
    io.emit(UPDOWN_START, startingSID);
  });
  socket.on(UPDOWN_STOP, () => {
    io.emit(UPDOWN_STOP);
  });
  return { io, socket, rooms, targetInfo };
};

export default game;
