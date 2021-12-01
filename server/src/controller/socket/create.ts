import type { RoomType } from '@src/types';
import { CREATE_REQUEST, CREATE_SUCCESS } from 'sooltreaming-domain/constant/socketEvent';
import { STATUS_VOTE_NORMAL } from '@src/constant';
import type { SocketPropType } from '@src/types';

const createRoomCode = (rooms: RoomType) => {
  while (true) {
    const code = Math.random().toString(16).substr(2, 5);
    if (!(code in rooms)) return code;
  }
};

const create = ({ io, socket, rooms, targetInfo }: SocketPropType): SocketPropType => {
  socket.on(CREATE_REQUEST, (user) => {
    const roomCode = createRoomCode(rooms);
    rooms[roomCode] = {
      hostSID: null,
      isOpen: true,
      waiters: [],
      closeupUser: '',
      users: {},
      usersDevices: {},
      status: STATUS_VOTE_NORMAL,
      vote: {
        trial: null,
        defendant: '',
        cool: {},
        voteBox: {},
      },
      game: {
        title: '',
        host: '',
      },
    };
    socket.emit(CREATE_SUCCESS, { roomCode });
  });

  return { io, socket, rooms, targetInfo };
};

export default create;
