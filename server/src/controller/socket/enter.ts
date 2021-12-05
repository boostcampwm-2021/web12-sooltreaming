import { ERROR } from '@src/constant';
import {
  ENTER_ROOM,
  ENTER_ROOM_ERROR,
  ENTER_ALL_USER,
  ENTER_ONE_USER,
  DISCONNECT_USER,
  ENTER_CHANGE_HOST,
  SIGNAL_NEED_OFFERS,
  CLOSEUP_OFF,
  CLOSEUP_BREAK,
  TICKET_FAILURE,
} from 'sooltreaming-domain/constant/socketEvent';
import type { EnterPropType, SocketPropType } from '@src/types';
import { createLog } from '@service/user';

const enter = ({ io, socket, rooms }: EnterPropType): SocketPropType => {
  const targetInfo = { code: '' };

  socket.on(ENTER_ROOM, ({ chatRoomCode: code, user, userDevices }) => {
    if (!(code in rooms)) return socket.emit(ENTER_ROOM_ERROR, ERROR.NOT_EXIST_ROOM);
    if (!rooms[code].isOpen) return socket.emit(ENTER_ROOM_ERROR, ERROR.UNAUTHORIZED_ROOM);
    targetInfo.code = code;

    const sid = socket.id;
    if (!Object.keys(rooms[code].users).length) {
      rooms[code].hostSID = sid;
      socket.emit(ENTER_CHANGE_HOST, rooms[code].isOpen);
    }

    rooms[code].users[sid] = user;
    rooms[code].users[sid].enterTime = new Date().getTime();
    rooms[code].usersDevices[sid] = userDevices;
    rooms[code].vote.cool[sid] = 0;

    socket.join(code);
    socket.emit(SIGNAL_NEED_OFFERS, rooms[code].users);
    socket.emit(ENTER_ALL_USER, rooms[code].users, rooms[code].usersDevices);
    io.to(code).emit(ENTER_ONE_USER, user, userDevices, socket.id);
    socket.emit(CLOSEUP_BREAK, rooms[code].closeupUser);
  });

  socket.on('disconnect', () => {
    const code = targetInfo.code;
    if (!rooms[code]) return;

    const sid = socket.id;
    socket.leave(code);

    // 접속시간 계산
    const leaveTime = new Date().getTime();
    const totalSeconds = Math.floor((leaveTime - rooms[code].users[sid].enterTime) / 1000);
    createLog(rooms[code].users[sid].id, DISCONNECT_USER, totalSeconds);

    delete rooms[code].users[sid];
    if (!Object.keys(rooms[code].users).length) {
      rooms[code].waiters.forEach((sid) => {
        io.to(sid).emit(TICKET_FAILURE, { message: ERROR.DELETED_ROOM });
      });
      delete rooms[code];
    } else {
      socket.broadcast.emit(DISCONNECT_USER, sid);
      if (rooms[code].hostSID === sid) {
        const newHostSID = Object.keys(rooms[code].users)[0];
        rooms[code].hostSID = newHostSID;
        io.to(newHostSID).emit(ENTER_CHANGE_HOST, rooms[code].isOpen);
      }
      if (rooms[code].closeupUser === sid) {
        rooms[code].closeupUser = '';
        io.to(code).emit(CLOSEUP_OFF);
      }
    }
  });

  return { io, socket, rooms, targetInfo };
};

export default enter;
