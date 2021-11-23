import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/enter';
import { SIGNAL_OFFER, SIGNAL_ANSWER, SIGNAL_ICE } from 'sooltreaming-domain/constant/socketEvent';

const signal = ({
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
  socket.on(SIGNAL_OFFER, ({ offer, receiverSID, senderSID }) => {
    io.to(receiverSID).emit(SIGNAL_OFFER, { offer, targetSID: senderSID });
  });

  socket.on(SIGNAL_ANSWER, ({ answer, receiverSID, senderSID }) => {
    io.to(receiverSID).emit(SIGNAL_ANSWER, { answer, targetSID: senderSID });
  });

  socket.on(SIGNAL_ICE, ({ candidate, receiverSID, senderSID }) => {
    io.to(receiverSID).emit(SIGNAL_ICE, { candidate, targetSID: senderSID });
  });
  return { io, socket, rooms, targetInfo };
};

export default signal;
