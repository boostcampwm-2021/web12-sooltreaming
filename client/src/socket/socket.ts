import io from 'socket.io-client';
import chatRoom from './chatRoom';

function Socket() {
  const socket = io('http://localhost:5000', {
    closeOnBeforeunload: false,
    withCredentials: true,
  });
  socket.disconnect();

  return {
    connect: () => socket.connect(),
    disconnect: () => socket.disconnect(),
    chatRoom: chatRoom(socket),
  };
}

export default Socket();
