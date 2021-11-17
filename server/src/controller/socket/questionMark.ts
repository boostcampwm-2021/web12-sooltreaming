import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/entering';

const QUESTION = 'QUESTION';

const questionMark = ({
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
  socket.on(QUESTION, ({ x, y }) => {
    const { code } = targetInfo;
    io.to(code).emit(QUESTION, { x, y });
  });
  return { io, socket, rooms, targetInfo };
};

export default questionMark;
