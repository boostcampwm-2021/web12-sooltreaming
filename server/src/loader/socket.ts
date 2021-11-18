import { Socket, Server } from 'socket.io';
import signaling from '@controller/socket/signaling';
import chatting from '@controller/socket/chatting';
import entering from '@controller/socket/entering';
import creating from '@controller/socket/creating';
import restricting from '@controller/socket/restricting';
import animation from '@controller/socket/animation';
import questionMark from '@controller/socket/questionMark';
import voting from '@controller/socket/voting';
import friending from '@controller/socket/friending';
import streamChange from '@controller/socket/streamChange';

import pipe from '@utils/pipe';
import { FRONT_BASE_URL } from '@src/constant';

export type roomType = {
  [code: string]: {
    hostSID: string;
    isOpen: boolean;
    closeupUser: string;
    users: {
      [sid: string]: {
        id: string;
        nickname: string;
        imgURL: string;
      };
    };
    usersDevices: {
      [sid: string]: {
        [deviceOn: string]: boolean;
      };
    };
    status: string;
    vote: {
      trial: NodeJS.Timeout | null;
      defendant: string;
      cool: { [sid: string]: number };
      voteBox: {
        [sid: string]: { isApprove: boolean; isVoted: boolean };
      };
    };
  };
};

const socketLoader = (server, app): any => {
  const io = new Server(server, {
    cors: {
      origin: FRONT_BASE_URL,
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });
  const rooms: roomType = {};

  io.on('connection', (socket: Socket) => {
    console.log('socket connection!!', socket.id);

    pipe(
      entering,
      signaling,
      chatting,
      creating,
      animation,
      questionMark,
      streamChange,
      restricting,
      voting,
      friending,
    )({ io, socket, rooms });

    socket.on('disconnect', () => {
      console.log('disconnect socket!!' + socket.id);
    });
  });

  return app;
};

export default socketLoader;
