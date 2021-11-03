import { Socket, Server } from 'socket.io';
import signaling from '../controller/socket/signaling';
import pipe from 'utils/pipe';

const socketLoader = (server, app): any => {
  const io = new Server(server, {
    cors: {
      origin: `http://${process.env.FRONT_HOST}:${process.env.FRONT_PORT}`,
      credentials: true,
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('socket connection!!', socket.id);

    pipe(signaling)(socket);

    socket.on('disconnect', () => {
      console.log('disconnect socket!!' + socket.id);
    });
  });

  return app;
}

export default socketLoader;
