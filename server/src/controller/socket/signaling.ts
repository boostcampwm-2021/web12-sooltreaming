import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/entering';
import { OFFER, ANSWER, ICE } from 'sooltreaming-domain/constant/socketEvent';

const Signaling = ({
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
  socket.on(OFFER, ({ offer, receiverSID, senderSID }) => {
    io.to(receiverSID).emit(OFFER, { offer, targetSID: senderSID });
  });

  socket.on(ANSWER, ({ answer, receiverSID, senderSID }) => {
    io.to(receiverSID).emit(ANSWER, { answer, targetSID: senderSID });
  });

  socket.on(ICE, ({ candidate, receiverSID, senderSID }) => {
    io.to(receiverSID).emit(ICE, { candidate, targetSID: senderSID });
  });
  return { io, socket, rooms, targetInfo };
};

export default Signaling;
