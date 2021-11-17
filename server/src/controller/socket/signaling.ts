import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/entering';

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
  socket.on('offer', ({ offer, receiverSID, senderSID }) => {
    io.to(receiverSID).emit('offer', { offer, targetSID: senderSID });
  });

  socket.on('answer', ({ answer, receiverSID, senderSID }) => {
    io.to(receiverSID).emit('answer', { answer, targetSID: senderSID });
  });

  socket.on('ice', ({ candidate, receiverSID, senderSID }) => {
    io.to(receiverSID).emit('ice', { candidate, targetSID: senderSID });
  });
  return { io, socket, rooms, targetInfo };
};

export default Signaling;
