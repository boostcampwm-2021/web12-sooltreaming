import { Socket } from 'socket.io';

const JOIN_ROOM = 'JOIN_ROOM';
const JOIN_ROOM_ERROR = 'JOIN_ROOM_ERROR';
const ENTER_ALL_USER = 'ENTER_ALL_USER';
const ENTER_ONE_USER = 'ENTER_ONE_USER';
const EXIT_ROOM_USER = 'EXIT_ROOM_USER';
const CHANGE_HOST = 'CHANGE_HOST';

const entering = ({ socket, rooms }: { socket: Socket; rooms: any }) => {
  let code = '';
  socket.on(JOIN_ROOM, ({ chatRoomCode, user }) => {
    if (!(chatRoomCode in rooms)) return socket.emit(JOIN_ROOM_ERROR, '존재하지 않는 방입니다.');
    code = chatRoomCode;
    const sid = socket.id;
    if (!Object.keys(rooms[code].users).length) rooms[code].hostID = sid;
    rooms[code].users[sid] = user;
    socket.join(code);
    socket.emit(ENTER_ALL_USER, rooms[code].users);
    socket.broadcast.emit(ENTER_ONE_USER, { [sid]: user });
  });

  socket.on('disconnect', () => {
    if (!rooms[code]) return;

    const sid = socket.id;
    socket.leave(code);
    delete rooms[code].users[sid];
    if (!Object.keys(rooms[code].users).length) delete rooms[code];
    else {
      socket.broadcast.emit(EXIT_ROOM_USER, sid);
      if (rooms[code].hostID === sid) {
        const newHost = Object.keys(rooms[code].users)[0];
        rooms[code].hostID = newHost;
        socket.broadcast.emit(CHANGE_HOST, newHost);
      }
    }
  });

  return { socket, rooms };
};

export default entering;
