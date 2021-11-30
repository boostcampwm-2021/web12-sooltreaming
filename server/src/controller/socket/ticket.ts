import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/enter';
import {
  TICKET_REQUEST,
  TICKET_SUCCESS,
  TICKET_FAILURE,
} from 'sooltreaming-domain/constant/socketEvent';
import { ERROR } from '@src/constant';

const ticket = ({
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
  let roomCode = '';
  socket.on(TICKET_REQUEST, ({ code }) => {
    roomCode = code;
    if (!(code in rooms)) return socket.emit(TICKET_FAILURE, { message: ERROR.NOT_EXIST_ROOM });
    if (!rooms[code].isOpen)
      return socket.emit(TICKET_FAILURE, { message: ERROR.UNAUTHORIZED_ROOM });

    rooms[code].waiters.push(socket.id);
  });

  socket.on(TICKET_SUCCESS, () => {
    if (!(roomCode in rooms)) return;
    rooms[roomCode].waiters = rooms[roomCode].waiters.filter((id) => id !== socket.id);
  });

  return { io, socket, rooms, targetInfo };
};

export default ticket;
