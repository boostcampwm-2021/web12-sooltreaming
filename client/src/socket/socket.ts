import io from 'socket.io-client';
import webRTC from './webRTC';
import message from './message';
import user from './user';
import chatRoom from './chatRoom';

const Socket = () => {
  const socket = io('http://localhost:5000', {
    closeOnBeforeunload: false,
    withCredentials: true,
  });
  socket.disconnect();

  return {
    connect: () => socket.connect(),
    disconnect: () => socket.disconnect(),
    webRTC: webRTC(socket),
    message: message(socket),
    user: user(socket),
    chatRoom: chatRoom(socket),
  };
};
export default Socket();
