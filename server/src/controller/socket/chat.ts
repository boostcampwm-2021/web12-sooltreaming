import { createLog } from '@service/user';
import { getTimeString } from '@utils/time';
import { CHAT_RECEIVE, CHAT_SENDING } from 'sooltreaming-domain/constant/socketEvent';
import type { SocketPropType } from '@src/types';

const chat = ({ io, socket, rooms, targetInfo }: SocketPropType): SocketPropType => {
  socket.on(CHAT_SENDING, ({ msg }) => {
    const { code } = targetInfo;

    const messageData = {
      msg,
      sid: socket.id,
      date: getTimeString(),
    };
    io.to(code).emit(CHAT_RECEIVE, messageData);

    const id = rooms[code].users[socket.id].id;
    createLog(id, CHAT_SENDING);
  });
  return { io, socket, rooms, targetInfo };
};

export default chat;
