const Signaling = ({ io, socket, rooms }) => {
  socket.on('offer', ({ offer, receiverSID, senderSID }) => {
    console.log('offer전송');
    io.to(receiverSID).emit('offer', { offer, targetSID: senderSID });
  });

  socket.on('answer', ({ answer, receiverSID, senderSID }) => {
    console.log('answer전송');
    io.to(receiverSID).emit('answer', { answer, targetSID: senderSID });
  });

  socket.on('ice', ({ candidate, receiverSID, senderSID }) => {
    io.to(receiverSID).emit('ice', { candidate, targetSID: senderSID });
  });
  return { io, socket, rooms };
};

export default Signaling;
