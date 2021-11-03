import { Socket } from 'socket.io';

const createRoomCode = (rooms: Object) => {
  let code;
  while (true) {
    code = Math.random().toString(16).substr(2, 5);
    if (!rooms[code]) break;
  }
  return code;
};

const joinRoom = (socket: Socket, roomCode: string) => {
  socket.join(roomCode);
  socket.emit('join_chat_room', roomCode);
};

const leaveRoom = (socket: Socket, rooms: Object, roomCode: string, socketId: string) => {
  socket.leave(roomCode);
  const members = rooms[roomCode].members;
  members.delete(socketId);
  if ([...members].length > 0) return;
  delete rooms[roomCode];
};

const leaveAllRoom = (socket: Socket, rooms: Object, socketId: string) => {
  if (Object.keys(rooms).length) return;
  Object.entries(rooms).forEach((room) => {
    const [roomCode, members] = room;
    console.log(members);
    if (!members.has(socketId)) return;
    leaveRoom(socket, rooms, roomCode, socketId);
  });
};

const chatRoomController = (socket: Socket, rooms: Object) => {
  socket.on('create_chat_room', () => {
    const socketId = socket.id;
    leaveAllRoom(socket, rooms, socketId);
    const roomCode = createRoomCode(rooms);
    rooms[roomCode] = {
      hostId: socketId,
      members: new Set().add(socketId),
    };
    joinRoom(socket, roomCode);
    console.log(rooms);
  });

  socket.on('join_chat_room', (roomCode: string) => {
    if (!rooms[roomCode]) socket.emit('join_room_error', '존재하지 않는 방입니다.');
    else {
      const socketId = socket.id;
      leaveAllRoom(socket, rooms, socketId);
      rooms[roomCode].members.add(socketId);
      joinRoom(socket, roomCode);
    }
    console.log(rooms);
  });
  return socket;
};

export default chatRoomController;
