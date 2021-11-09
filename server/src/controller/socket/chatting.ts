import { Socket } from 'socket.io';
import { getTimeString } from '@utils/time';
import type { roomType } from '@loader/socket';

const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const PASSING_MESSAGE = 'PASSING_MESSAGE';

const chatting = ({ io, socket, rooms }: { io: any; socket: Socket; rooms: roomType }) => {
  socket.on(PASSING_MESSAGE, (msg) => {
    const messageData = {
      ...msg,
      sid: socket.id,
      date: getTimeString(),
    };
    socket.emit(RECEIVE_MESSAGE, messageData);
    socket.broadcast.emit(RECEIVE_MESSAGE, messageData);
  });
  return { io, socket, rooms };
};

export default chatting;
