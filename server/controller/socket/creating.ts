import { Socket } from 'socket.io';

const CREATE_ROOM = 'CREATE_ROOM';
const JOIN_ROOM = 'JOIN_ROOM';

const createRoomCode = (rooms: Object) => {
  let code;
  while (true) {
    code = Math.random().toString(16).substr(2, 5);
    if (!rooms[code]) break;
  }
  return code;
};
const creating = ({ socket, rooms }) => {
  socket.on(CREATE_ROOM, (user) => {
    const sid = socket.id;
    const roomCode = createRoomCode(rooms);
    rooms[roomCode] = {
      hostID: sid,
      isOpen: true,
      users: {
        [sid]: user,
      },
    };
    socket.join(roomCode);
    socket.emit(JOIN_ROOM, roomCode);
  });

  return { socket, rooms };
};

export default creating;
