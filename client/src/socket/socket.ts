import io from 'socket.io-client';
import webRTC from './webRTC';
import message from './message';
import user from './user';
import host from './host';
import { BACK_BASE_URL } from '@constant/envs';

const Socket = () => {
  const socket = io(BACK_BASE_URL, {
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
  };
};
export default Socket();
