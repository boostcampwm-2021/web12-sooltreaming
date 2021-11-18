import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';

const JOIN_ROOM = 'JOIN_ROOM';
const JOIN_ROOM_ERROR = 'JOIN_ROOM_ERROR';
const ENTER_ALL_USER = 'ENTER_ALL_USER';
const ENTER_ONE_USER = 'ENTER_ONE_USER';
const EXIT_ROOM_USER = 'EXIT_ROOM_USER';
const CHANGE_HOST = 'CHANGE_HOST';
const NEED_OFFERS = 'need offers';
const CANCEL_CLOSEUP = 'CANCEL_CLOSEUP';
const EXIST_CLOSEUP = 'EXIST_CLOSEUP';

export type TargetInfoType = {
  code: string;
};

const entering = ({ io, socket, rooms }: { io: any; socket: Socket; rooms: roomType }) => {
  const targetInfo = { code: '' };

  socket.on(JOIN_ROOM, ({ chatRoomCode: code, user, userDevices }) => {
    if (!(code in rooms)) return socket.emit(JOIN_ROOM_ERROR, '존재하지 않는 방입니다.');
    if (!rooms[code].isOpen) return socket.emit(JOIN_ROOM_ERROR, '입장이 제한된 방입니다.');
    targetInfo.code = code;

    const sid = socket.id;
    if (!Object.keys(rooms[code].users).length) {
      rooms[code].hostSID = sid;
      socket.emit(CHANGE_HOST, rooms[code].isOpen);
    }

    rooms[code].users[sid] = user;
    rooms[code].usersDevices[sid] = userDevices;
    rooms[code].vote.cool[sid] = 0;

    socket.join(code);
    socket.emit(NEED_OFFERS, rooms[code].users);
    socket.emit(ENTER_ALL_USER, rooms[code].users, rooms[code].usersDevices);
    io.to(code).emit(ENTER_ONE_USER, user, userDevices, socket.id);
    socket.emit(EXIST_CLOSEUP, rooms[code].closeupUser);
  });

  socket.on('disconnect', () => {
    const code = targetInfo.code;
    if (!rooms[code]) return;

    const sid = socket.id;
    socket.leave(code);
    delete rooms[code].users[sid];
    if (!Object.keys(rooms[code].users).length) delete rooms[code];
    else {
      socket.broadcast.emit(EXIT_ROOM_USER, sid);
      if (rooms[code].hostSID === sid) {
        const newHostSID = Object.keys(rooms[code].users)[0];
        rooms[code].hostSID = newHostSID;
        io.to(newHostSID).emit(CHANGE_HOST, rooms[code].isOpen);
      }
      if (rooms[code].closeupUser === sid) {
        rooms[code].closeupUser = '';
        io.to(code).emit(CANCEL_CLOSEUP);
      }
    }
  });

  return { io, socket, rooms, targetInfo };
};

export default entering;
