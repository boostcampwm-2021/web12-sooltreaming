import io from 'socket.io-client';
import webRTC from '@socket/webRTC';
import message from '@socket/message';
import user from '@socket/user';
import host from '@socket/host';
import { BACK_BASE_URL } from '@constant/envs';
import animation from '@socket/animation';
import questionmark from '@socket/questionmark';
import isVideoOnOff from '@src/socket/isStreamOnOff';
import roomControl from '@socket/roomControl';
import vote from '@socket/vote';
import requestFriend from '@socket/requestFriend';

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
    animation: animation(socket),
    questionmark: questionmark(socket),
    isVideoOnOff: isVideoOnOff(socket),
    roomControl: roomControl(socket),
    vote: vote(socket),
    requestFriend: requestFriend(socket),
  };
};
export default Socket();
