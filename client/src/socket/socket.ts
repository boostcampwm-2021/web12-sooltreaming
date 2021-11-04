import io from 'socket.io-client';
import webRTC from './webRTC';
import message from './message';
import user from './user';
import host from './host';

const Socket = () => {
  const socket = io('http://localhost:5000', {
    closeOnBeforeunload: false,
    withCredentials: true,
  });
  socket.disconnect();

  return {
    getSID: () => socket.id,
    connect: () => socket.connect(),
    disconnect: () => socket.disconnect(),
    webRTC: webRTC(socket),
    message: message(socket),
    user: user(socket),
    host: host(socket),
  };
};
export default Socket();
