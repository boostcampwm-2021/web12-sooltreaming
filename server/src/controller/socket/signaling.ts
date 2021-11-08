import { Socket } from 'socket.io';

const Signaling = ({ io, socket, rooms }: { io: any; socket: Socket; rooms: any }) => {
  socket.on('offer', ({ offer, receiverSID, senderSID }) => {
    io.to(receiverSID).emit('offer', { offer, targetSID: senderSID });
  });

  socket.on('answer', ({ answer, receiverSID, senderSID }) => {
    io.to(receiverSID).emit('answer', { answer, targetSID: senderSID });
  });

  socket.on('ice', ({ candidate, receiverSID, senderSID }) => {
    io.to(receiverSID).emit('ice', { candidate, targetSID: senderSID });
  });
  return { io, socket, rooms };
};

export default Signaling;
