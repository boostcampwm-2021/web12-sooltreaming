import { Socket } from 'socket.io-client';

const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const PASSING_MESSAGE = 'PASSING_MESSAGE';

const message = (socket: Socket) => (closure: any) => {
  const { setChatLog } = closure;

  socket.on(RECEIVE_MESSAGE, (chat) => {
    setChatLog((prev) => [...prev, { ...chat }]);
  });

  const sendMessage = (chat) => socket.emit(PASSING_MESSAGE, chat);

  return { sendMessage };
};

export default message;
