import { Socket } from 'socket.io';
import { createLog } from '@utils/log';
import { getTimeString } from '@utils/time';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/enter';
import { CHAT_RECEIVE, CHAT_SENDING } from 'sooltreaming-domain/constant/socketEvent';

const chat = ({
  io,
  socket,
  rooms,
  targetInfo,
}: {
  io: any;
  socket: Socket;
  rooms: roomType;
  targetInfo: TargetInfoType;
}) => {
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
