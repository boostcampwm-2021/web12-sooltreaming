import { Socket } from 'socket.io';
import { getTimeString } from '/utils/time';

const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const PASSING_MESSAGE = 'PASSING_MESSAGE';

const chatting = ({ io, socket, rooms }) => {
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
