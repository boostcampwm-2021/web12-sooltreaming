import { Socket } from 'socket.io';
import { getTimeString } from '@utils/time';
import type { roomType } from '@loader/socket';

const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const PASSING_MESSAGE = 'PASSING_MESSAGE';

const chatting = ({ io, socket, rooms }: { io: any; socket: Socket; rooms: roomType }) => {
  socket.on(PASSING_MESSAGE, ({ msg, chatRoomCode, user }) => {
    let code = '';
    code = chatRoomCode;
    const messageData = {
      msg,
      sid: socket.id,
      date: getTimeString(),
    };
    io.to(code).emit(RECEIVE_MESSAGE, messageData);
  });
  return { io, socket, rooms };
};

export default chatting;
