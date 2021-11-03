import io from 'socket.io-client';
import webRTC from './webRTC';

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
  };
};
export default Socket();
