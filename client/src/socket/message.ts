import { Socket } from 'socket.io-client';

const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const PASSING_MESSAGE = 'PASSING_MESSAGE';

const message = (socket: Socket) => (closure: any) => {
  const { setChatLog } = closure;
  console.log(socket, '채팅소켓');
  socket.on(RECEIVE_MESSAGE, (chat) => {
    setChatLog((prev) => {
      return [...prev, { ...chat }];
    });
  });

  const sendMessage = (mydata) => {
    socket.emit(PASSING_MESSAGE, mydata);
    console.log(mydata, 'test');
  };
  const disconnecting = () => {
    socket.off(RECEIVE_MESSAGE);
  };

  return { sendMessage, disconnecting };
};

export default message;
