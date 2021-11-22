import { Socket } from 'socket.io-client';

const TICKET_REQUEST = 'TICKET_REQUEST';
const TICKET_FAILURE = 'TICKET_FAILURE';

const ticket = (socket: Socket) => (closure: any) => {
  const { abortEnter } = closure;

  socket.on(TICKET_FAILURE, abortEnter);

  const requestValidation = (param) => socket.emit(TICKET_REQUEST, param);

  const disconnecting = () => {
    socket.off(TICKET_FAILURE);
  };

  return { requestValidation, disconnecting };
};

export default ticket;
