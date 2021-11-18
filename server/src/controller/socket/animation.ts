import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/entering';

import { createLog } from '@controller/socket/logController';

const CHEERS = 'CHEERS';
const CLOSEUP = 'CLOSEUP';
const CANCEL_CLOSEUP = 'CANCEL_CLOSEUP';

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
  socket.on(CHEERS, ({ user }) => {
    const { code } = targetInfo;
    io.to(code).emit(CHEERS);
  });

  socket.on(CLOSEUP, () => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;
    rooms[code].closeupUser = socket.id;
    io.to(code).emit(CLOSEUP, socket.id);

    const id = rooms[code].users[socket.id].id;
    createLog(id, CLOSEUP);
  });

  socket.on(CANCEL_CLOSEUP, () => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;
    if (rooms[code].status === STATUS_EXECUTING && rooms[code].hostSID !== socket.id) return;
    rooms[code].status = STATUS_NORMAL;
    rooms[code].closeupUser = '';
    io.to(code).emit(CANCEL_CLOSEUP);
  });

  return { io, socket, rooms, targetInfo };
};

export default animation;
