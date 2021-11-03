import { Socket } from 'socket.io';

const JOIN_ROOM = 'JOIN_ROOM';
const ENTER_ALL_USER = 'ENTER_ALL_USER';
const ENTER_ONE_USER = 'ENTER_ONE_USER';
const EXIT_ROOM_USER = 'EXIT_ROOM_USER';

const entering = (socket: Socket) => {
  const users = {};

  socket.on(JOIN_ROOM, (infos) => {
    const sid = socket.id;
    users[sid] = infos;

    socket.emit(ENTER_ALL_USER, users);
    socket.broadcast.emit(ENTER_ONE_USER, { [sid]: infos });
  });

  socket.on('disconnect', () => {
    const sid = socket.id;
    delete users[sid];
    socket.broadcast.emit(EXIT_ROOM_USER, sid);
  });

  return socket;
};

export default entering;
