import { Socket, Server } from 'socket.io';
import signaling from '../controller/socket/signaling';
import pipe from 'utils/pipe';

import chatting from '/controller/socket/chatting';
import entering from '/controller/socket/entering';
import chatRoomController from '/controller/socket/chatRoomController';

const socketLoader = (server, app): any => {
  const io = new Server(server, {
    cors: {
      origin: `http://${process.env.FRONT_HOST}:${process.env.FRONT_PORT}`,
      credentials: true,
    },
  });
  const rooms = {};

  io.on('connection', (socket: Socket) => {
    console.log('socket connection!!', socket.id);

    pipe(signaling, chatting, entering)(socket);
    chatRoomController(socket, rooms);

    socket.on('disconnect', () => {
      console.log('disconnect socket!!' + socket.id);
    });
  });

  return app;
};

export default socketLoader;
