import { Socket } from 'socket.io';

const JOIN_ROOM = 'JOIN_ROOM';
const JOIN_ROOM_ERROR = 'JOIN_ROOM_ERROR';
const ENTER_ALL_USER = 'ENTER_ALL_USER';
const ENTER_ONE_USER = 'ENTER_ONE_USER';
const EXIT_ROOM_USER = 'EXIT_ROOM_USER';

const leaveRoom = (socket: Socket, rooms: Object, roomCode: string, sid: string) => {
  socket.leave(roomCode);
  delete rooms[roomCode].users[sid];
  if (Object.keys(rooms[roomCode].users).length > 0) return;
  delete rooms[roomCode];
};

const leaveAllRoom = (socket: Socket, rooms: Object, sid: string) => {
  if (Object.keys(rooms).length) return;
  Object.entries(rooms).forEach((room) => {
    const [roomCode, roomInfo] = room;
    if (!roomInfo.users[sid]) return;
    leaveRoom(socket, rooms, roomCode, sid);
  });
};

const entering = ({ socket, rooms }) => {
  socket.on(JOIN_ROOM, ({ chatRoomCode, user }) => {
    if (!rooms[chatRoomCode]) socket.emit(JOIN_ROOM_ERROR, '존재하지 않는 방입니다.');
    else {
      const sid = socket.id;
      leaveAllRoom(socket, rooms, sid);
      rooms[chatRoomCode].users[sid] = user;
      socket.join(chatRoomCode);
      socket.emit(ENTER_ALL_USER, rooms[chatRoomCode].users);
      socket.broadcast.emit(ENTER_ONE_USER, { [sid]: user });
    }
  });

  socket.on('disconnect', () => {
    const sid = socket.id;
    leaveAllRoom(socket, rooms, sid);
    socket.broadcast.emit(EXIT_ROOM_USER, sid);
  });

  return { socket, rooms };
};

export default entering;
