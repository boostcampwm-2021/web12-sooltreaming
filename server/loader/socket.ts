import { Socket, Server } from 'socket.io';
import chatRoomController from '/controller/socket/chatRoomController';

function socketLoader(server, app): any {
  const io = new Server(server, {
    cors: {
      origin: `http://${process.env.FRONT_HOST}:${process.env.FRONT_PORT}`,
      credentials: true,
    },
  });
  const rooms = {};

  io.on('connection', (socket: Socket) => {
    console.log('socket connection!!', socket.id);

    chatRoomController(socket, rooms);

    socket.on('disconnect', () => {
      console.log('disconnect socket!!' + socket.id);
    });
  });
  return app;
}

export default socketLoader;
