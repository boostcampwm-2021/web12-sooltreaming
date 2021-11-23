import { Socket } from 'socket.io-client';
import { RECEIVE_MESSAGE, PASSING_MESSAGE } from 'sooltreaming-domain/constant/socketEvent';

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
