import { Socket } from 'socket.io';
import { getTimeString } from '@utils/time';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/entering';

const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const PASSING_MESSAGE = 'PASSING_MESSAGE';

const chatting = ({
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
  socket.on(PASSING_MESSAGE, ({ msg, user }) => {
    const { code } = targetInfo;

    const messageData = {
      msg,
      sid: socket.id,
      date: getTimeString(),
    };
    io.to(code).emit(RECEIVE_MESSAGE, messageData);
  });
  return { io, socket, rooms, targetInfo };
};

export default chatting;
