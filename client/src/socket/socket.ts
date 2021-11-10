import io from 'socket.io-client';
import webRTC from './webRTC';
import message from './message';
import user from './user';
import host from './host';
import animation from './animation';

const PROTOCOL = process.env.REACT_APP_DEPLOYMENT === 'production' ? 'https' : 'http';
const HOST = process.env.REACT_APP_BACK_HOST || '';
const PORT = process.env.REACT_APP_BACK_PORT || '';

const Socket = () => {
  const socket = io(`${PROTOCOL}://${HOST}${!PORT ? '' : ':'}${PORT}`, {
    transports: ['websocket'],
    upgrade: false,
    forceNew: true,
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
    animation: animation(socket),
  };
};
export default Socket();
