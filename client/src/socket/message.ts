import { Socket } from 'socket.io-client';

const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const PASSING_MESSAGE = 'PASSING_MESSAGE';

const message = (socket: Socket) => (closure: any) => {
  const { addChat } = closure;

  socket.on(RECEIVE_MESSAGE, (chat) => {
    addChat(chat);
  });

  const sendMessage = (myChat) => {
    socket.emit(PASSING_MESSAGE, myChat);
  };
  const disconnecting = () => {
    socket.off(RECEIVE_MESSAGE);
  };

  return { sendMessage, disconnecting };
};

export default message;
