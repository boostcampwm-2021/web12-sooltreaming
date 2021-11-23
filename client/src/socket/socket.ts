import io from 'socket.io-client';
import { BACK_BASE_URL } from '@constant/envs';
import animation from '@socket/animation';
import chat from '@socket/chat';
import control from '@socket/control';
import create from '@socket/create';
import enter from '@socket/enter';
import friend from '@socket/friend';
import game from '@socket/game';
import mark from '@socket/mark';
import signal from '@socket/signal';
import stream from '@socket/stream';
import ticket from '@socket/ticket';
import vote from '@socket/vote';

const Socket = () => {
  const socket = io(BACK_BASE_URL, {
    transports: ['websocket'],
    upgrade: false,
    forceNew: true,
  });
  socket.disconnect();

  return {
    getSID: () => socket.id,
    connect: () => socket.connect(),
    disconnect: () => socket.disconnect(),
    animation: animation(socket),
    chat: chat(socket),
    control: control(socket),
    create: create(socket),
    enter: enter(socket),
    friend: friend(socket),
    game: game(socket),
    mark: mark(socket),
    signal: signal(socket),
    stream: stream(socket),
    ticket: ticket(socket),
    vote: vote(socket),
  };
};
export default Socket();
