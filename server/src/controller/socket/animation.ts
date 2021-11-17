import { Socket } from 'socket.io';
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
    io.to(code).emit(CHEERS);
  });

  socket.on(CLOSEUP, ({ chatRoomCode, sid }) => {
    rooms[chatRoomCode].closeupUser = sid;
    io.to(chatRoomCode).emit(CLOSEUP, sid);
  });

  socket.on(CANCEL_CLOSEUP, (chatRoomCode) => {
    rooms[chatRoomCode].closeupUser = '';
    io.to(chatRoomCode).emit(CANCEL_CLOSEUP);
  });

  socket.on(EXIST_CLOSEUP, ({ chatRoomCode, sid }) => {
    io.to(sid).emit(EXIST_CLOSEUP, rooms[chatRoomCode].closeupUser);
  });
  return { io, socket, rooms };
};

export default animation;
