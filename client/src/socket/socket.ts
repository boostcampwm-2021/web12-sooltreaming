import io from 'socket.io-client';
import message from './message';
import user from './user';
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
    message: message(socket),
    user: user(socket),
    chatRoom: chatRoom(socket),
  };
}

export default Socket();
