import { Socket } from 'socket.io-client';

const TICKET_REQUEST = 'TICKET_REQUEST';
const TICKET_FAILURE = 'TICKET_FAILURE';

const host = (socket: Socket) => (closure: any) => {
  const { abortEnter } = closure;

  socket.on(TICKET_FAILURE, abortEnter);

  const requestValidation = () => socket.emit(TICKET_REQUEST);

  const disconnecting = () => {
    socket.off(TICKET_FAILURE);
  };

  return { requestValidation, disconnecting };
};

export default host;
