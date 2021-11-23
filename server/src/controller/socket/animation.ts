import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/enter';
import { createLog } from '@controller/socket/logController';
import {
  CHEERS_BROADCAST,
  CLOSEUP_ON,
  CLOSEUP_OFF,
} from 'sooltreaming-domain/constant/socketEvent';

const STATUS_EXECUTING = 'STATUS_EXECUTING';
const STATUS_NORMAL = 'STATUS_NORMAL';

const animation = ({
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
  socket.on(CHEERS_BROADCAST, () => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;
    io.to(code).emit(CHEERS_BROADCAST);
  });

  socket.on(CLOSEUP_ON, () => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;
    rooms[code].closeupUser = socket.id;
    io.to(code).emit(CLOSEUP_ON, socket.id);

    const id = rooms[code].users[socket.id].id;
    createLog(id, CLOSEUP_ON);
  });

  socket.on(CLOSEUP_OFF, () => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;
    if (rooms[code].status === STATUS_EXECUTING && rooms[code].hostSID !== socket.id) return;
    rooms[code].status = STATUS_NORMAL;
    rooms[code].closeupUser = '';
    io.to(code).emit(CLOSEUP_OFF);
  });

  return { io, socket, rooms, targetInfo };
};

export default animation;
