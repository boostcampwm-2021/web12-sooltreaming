import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/enter';
import {
  TICKET_REQUEST,
  TICKET_SUCCESS,
  TICKET_FAILURE,
} from 'sooltreaming-domain/constant/socketEvent';

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
    if (!(code in rooms))
      return socket.emit(TICKET_FAILURE, { message: '존재하지 않는 방입니다.' });
    if (!rooms[code].isOpen)
      return socket.emit(TICKET_FAILURE, { message: '입장이 제한된 방입니다.' });

    rooms[code].waiters.push(socket.id);
  });

  socket.on(TICKET_SUCCESS, () => {
    if (!(roomCode in rooms)) return;
    rooms[roomCode].waiters = rooms[roomCode].waiters.filter((id) => id !== socket.id);
  });

  return { io, socket, rooms, targetInfo };
};

export default ticket;
