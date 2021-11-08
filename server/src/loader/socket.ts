import { Socket, Server } from 'socket.io';
import signaling from '@controller/socket/signaling';
import chatting from '@controller/socket/chatting';
import entering from '@controller/socket/entering';
import creating from '@controller/socket/creating';

import pipe from '@utils/pipe';

export type roomType = {
  [code: string]: {
    hostID: string;
    isOpen: boolean;
    users: {
      [sid: string]: {
        uid: string;
        nickname: string;
        imgURL: string;
        videoID: string;
        audioID: string;
      };
    };
  };
};

const socketLoader = (server, app): any => {
  const io = new Server(server, {
    cors: {
      origin: `http://${process.env.FRONT_HOST}:${process.env.FRONT_PORT}`,
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });
  const rooms: roomType = {};

  io.on('connection', (socket: Socket) => {
    console.log('socket connection!!', socket.id);

    pipe(signaling, chatting, creating, entering)({ io, socket, rooms });

    socket.on('disconnect', () => {
      console.log('disconnect socket!!' + socket.id);
    });
  });

  return app;
};

export default socketLoader;
