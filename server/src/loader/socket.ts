import { Socket, Server } from 'socket.io';
import animation from '@controller/socket/animation';
import chat from '@controller/socket/chat';
import control from '@controller/socket/control';
import create from '@controller/socket/create';
import enter from '@controller/socket/enter';
import friend from '@controller/socket/friend';
import game from '@controller/socket/game';
import mark from '@controller/socket/mark';
import signal from '@controller/socket/signal';
import stream from '@controller/socket/stream';
import ticket from '@controller/socket/ticket';
import vote from '@controller/socket/vote';

import pipe from '@utils/pipe';
import { FRONT_BASE_URL } from '@src/constant';
import type { RoomType } from '@src/types';

const socketLoader = (server, app): any => {
  const io = new Server(server, {
    cors: {
      origin: FRONT_BASE_URL,
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });
  const rooms: RoomType = {};

  io.on('connection', (socket: Socket): void => {
    console.log('socket connection!!', socket.id);

    pipe(
      enter,
      animation,
      chat,
      control,
      create,
      friend,
      game,
      mark,
      signal,
      stream,
      ticket,
      vote,
    )({ io, socket, rooms });

    socket.on('disconnect', () => {
      console.log('disconnect socket!!' + socket.id);
    });
  });

  return app;
};

export default socketLoader;
