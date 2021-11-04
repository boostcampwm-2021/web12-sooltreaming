import io from 'socket.io-client';
import webRTC from './webRTC';
import message from './message';
import user from './user';

const Socket = () => {
  const socket = io('http://localhost:5000', {
    transports: ['websocket'],
    upgrade: false,
    forceNew: true,
  });
  socket.disconnect();

  return {
    isConnect: () => socket.connected,
    connect: () => socket.connect(),
    disconnect: () => socket.disconnect(),
    webRTC: webRTC(socket),
    message: message(socket),
    user: user(socket),
  };
};
export default Socket();
