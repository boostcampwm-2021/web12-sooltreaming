import { Socket } from 'socket.io';
import { getTimeString } from '/utils/time';

const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const PASSING_MESSAGE = 'PASSING_MESSAGE';

const chatting = (socket: Socket) => {
  socket.on(PASSING_MESSAGE, (msg) => {
    const messageData = {
      ...msg,
      date: getTimeString(),
    };
    socket.emit(RECEIVE_MESSAGE, messageData);
    socket.broadcast.emit(RECEIVE_MESSAGE, messageData);
  });
  return socket;
};

export default chatting;
