import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/entering';

const TOGGLE_ROOM_ENTRY = 'TOGGLE_ROOM_ENTRY';
const AUTHORITY_ERROR = 'AUTHORITY_ERROR';

const restricting = ({
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
  socket.on(TOGGLE_ROOM_ENTRY, () => {
    const { code } = targetInfo;

    if (rooms[code].hostID !== socket.id)
      return socket.emit(AUTHORITY_ERROR, '당신은 방장이 아닙니다.');
    const state = rooms[code].isOpen;
    rooms[code].isOpen = !state;
    socket.emit(TOGGLE_ROOM_ENTRY, true);
  });

  return { io, socket, rooms };
};

export default restricting;
