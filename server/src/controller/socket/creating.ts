import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/entering';

const CREATE_REQUEST = 'CREATE_REQUEST';
const CREATE_SUCCESS = 'CREATE_SUCCESS';

const createRoomCode = (rooms: roomType) => {
  while (true) {
    const code = Math.random().toString(16).substr(2, 5);
    if (!(code in rooms)) return code;
  }
};

const creating = ({
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
  socket.on(CREATE_REQUEST, (user) => {
    const roomCode = createRoomCode(rooms);
    rooms[roomCode] = {
      hostID: null,
      isOpen: true,
      closeupUser: '',
      users: {},
      usersDevices: {},
      status: 'NORMAL',
      vote: {
        trial: null,
        defendant: '',
        cool: {},
        voteBox: {},
      },
    };
    socket.emit(CREATE_SUCCESS, { roomCode });
  });

  return { io, socket, rooms, targetInfo };
};

export default creating;
