import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/entering';
import { START_UPDOWN, STOP_UPDOWN } from 'sooltreaming-domain/constant/socketEvent';

const gaming = ({
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
  socket.on(START_UPDOWN, (startingSID) => {
    io.emit(START_UPDOWN, startingSID);
  });
  socket.on(STOP_UPDOWN, () => {
    io.emit(STOP_UPDOWN);
  });
  return { io, socket, rooms, targetInfo };
};

export default gaming;
