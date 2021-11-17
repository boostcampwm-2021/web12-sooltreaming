import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';

const TOGGLE_ROOM_ENTRY = 'TOGGLE_ROOM_ENTRY';
const AUTHORITY_ERROR = 'AUTHORITY_ERROR'

const restricting = ({ io, socket, rooms }: { io: any; socket: Socket; rooms: roomType }) => {
  socket.on(TOGGLE_ROOM_ENTRY, ({ chatRoomCode }) => {
    if(rooms[chatRoomCode].hostID !== socket.id) return socket.emit(AUTHORITY_ERROR, '당신은 방장이 아닙니다.');
    const state = rooms[chatRoomCode].isOpen;
    rooms[chatRoomCode].isOpen = !state;
    socket.emit(TOGGLE_ROOM_ENTRY, true);
  });

  return { io, socket, rooms };
};

export default restricting;
