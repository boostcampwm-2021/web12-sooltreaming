import { Socket } from 'socket.io';
import { createLog } from '@utils/log';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/enter';
import { MARK_BROADCAST } from 'sooltreaming-domain/constant/socketEvent';

const mark = ({
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
  socket.on(MARK_BROADCAST, ({ x, y }) => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;

    io.to(code).emit(MARK_BROADCAST, { x, y });
    const id = rooms[code].users[socket.id].id;
    createLog(id, MARK_BROADCAST);
  });
  return { io, socket, rooms, targetInfo };
};

export default mark;
