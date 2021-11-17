import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/entering';

const CHEERS = 'CHEERS';
const CLOSEUP = 'CLOSEUP';
const CANCEL_CLOSEUP = 'CANCEL_CLOSEUP';

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
  });

  socket.on(CANCEL_CLOSEUP, () => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;
    rooms[code].closeupUser = '';
    io.to(code).emit(CANCEL_CLOSEUP);
  });

  return { io, socket, rooms, targetInfo };
};

export default animation;
