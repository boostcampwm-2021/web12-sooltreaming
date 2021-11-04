import { Socket } from 'socket.io';

const Signaling = (socket: Socket) => {
  socket.on('joinRoom', (roomCode) => {
    console.log('룸참여');
    socket.join(roomCode);
    socket.to(roomCode).emit('welcome');
  });

  socket.on('offer', (offer, roomCode) => {
    console.log('offer전송');
    socket.to(roomCode).emit('offer', offer);
  });

  socket.on('answer', (answer, roomCode) => {
    console.log('answer전송');
    socket.to(roomCode).emit('answer', answer);
  });

  socket.on('ice', (ice, roomCode) => {
    console.log('ice전송');
    socket.to(roomCode).emit('ice', ice);
  });
  return socket;
};

export default Signaling;
