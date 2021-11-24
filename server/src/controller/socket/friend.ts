import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/enter';
import { FRIEND_REQUEST } from 'sooltreaming-domain/constant/socketEvent';

const friend = ({
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
  socket.on(FRIEND_REQUEST, (receiverSID) => {
    io.to(receiverSID).emit(FRIEND_REQUEST);
  });
  return { io, socket, rooms, targetInfo };
};

export default friend;