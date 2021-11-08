import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';

const CREATE_REQUEST = 'CREATE_REQUEST';
const CREATE_SUCCESS = 'CREATE_SUCCESS';

const createRoomCode = (rooms: roomType) => {
  let code;
  while (true) {
    code = Math.random().toString(16).substr(2, 5);
    if (!rooms[code]) break;
  }
  return code;
};

const creating = ({ io, socket, rooms }: { io: any; socket: Socket; rooms: roomType }) => {
  socket.on(CREATE_REQUEST, (user) => {
    const roomCode = createRoomCode(rooms);
    rooms[roomCode] = {
      hostID: null,
      isOpen: true,
      users: {},
    };
    socket.emit(CREATE_SUCCESS, { roomCode });
  });

  return { io, socket, rooms };
};

export default creating;
