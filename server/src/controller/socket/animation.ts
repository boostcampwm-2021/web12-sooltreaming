import { Socket } from 'socket.io';
import { getTimeString } from '@utils/time';
import type { roomType } from '@loader/socket';

const CHEERS = 'CHEERS';
const CLOSEUP = 'CLOSEUP';
const CANCEL_CLOSEUP = 'CANCEL_CLOSEUP';
const EXIST_CLOSEUP = 'EXIST_CLOSEUP';
const QUESTION_MARK = 'QUESTION_MARK';

const animation = ({ io, socket, rooms }: { io: any; socket: Socket; rooms: roomType }) => {
  socket.on(CHEERS, ({ chatRoomCode, user }) => {
    let code = '';
    code = chatRoomCode;
    io.emit(CHEERS);
  });

  socket.on(CLOSEUP, ({ chatRoomCode, sid }) => {
    rooms[chatRoomCode].closeupUser = sid;
    io.to(chatRoomCode).emit(CLOSEUP, sid);
  });

  socket.on(CANCEL_CLOSEUP, (chatRoomCode) => {
    rooms[chatRoomCode].closeupUser = '';
    io.to(chatRoomCode).emit(CANCEL_CLOSEUP);
  });
  return { io, socket, rooms };
};

export default animation;
