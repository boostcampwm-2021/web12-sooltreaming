import { Socket, Server } from 'socket.io';
import chatting from '/controller/socket/chatting';
import entring from '/controller/socket/entering';

interface Chat {
  message: string;
  room_id: string;
}

function socketLoader(server, app): any {
  const io = new Server(server, {
    cors: {
      origin: `http://${process.env.FRONT_HOST}:${process.env.FRONT_PORT}`,
      credentials: true,
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('socket connection!!', socket.id);

    socket.on('send_message', (chat: Chat) => {
      socket.broadcast.to(chat.room_id).emit('receive_message', chat);
    });
    chatting(socket);
    entring(socket);
    socket.on('disconnect', () => {
      console.log('disconnect socket!!' + socket.id);
    });
  });
  return app;
}

export default socketLoader;
