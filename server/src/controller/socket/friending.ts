import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/entering';
import { REQUEST_FRIEND } from 'sooltreaming-domain/constant/socketEvent';

const friending = ({
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
  socket.on(REQUEST_FRIEND, (receiverSID) => {
    io.to(receiverSID).emit(REQUEST_FRIEND);
  });
  return { io, socket, rooms, targetInfo };
};

export default friending;
