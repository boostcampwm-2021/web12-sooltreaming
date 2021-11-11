import { Socket } from 'socket.io';
import { getTimeString } from '@utils/time';
import type { roomType } from '@loader/socket';

const QUESTION = 'QUESTION';

const questionMark = ({ io, socket, rooms }: { io: any; socket: Socket; rooms: roomType }) => {
  socket.on(QUESTION, ({ x, y, chatRoomCode, user }) => {
    let x1 = x;
    console.log(x1);
    console.log(x, y);
    let code = '';
    code = chatRoomCode;
    socket.emit(QUESTION, { x, y });
    socket.to(code).emit(QUESTION, { x, y });
  });
  return { io, socket, rooms };
};

export default questionMark;
