import { Socket } from 'socket.io-client';
import { CHAT_RECEIVE, CHAT_SENDING } from 'sooltreaming-domain/constant/socketEvent';

const chat = (socket: Socket) => (closure: any) => {
  const { addChat } = closure;

  socket.on(CHAT_RECEIVE, (chat) => {
    addChat(chat);
  });

  const sendMessage = (myChat) => {
    socket.emit(CHAT_SENDING, myChat);
  };
  const disconnecting = () => {
    socket.off(CHAT_RECEIVE);
  };

  return { sendMessage, disconnecting };
};

export default chat;
