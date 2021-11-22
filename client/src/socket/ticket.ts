import { Socket } from 'socket.io-client';

const TICKET_REQUEST = 'TICKET_REQUEST';
const TICKET_SUCCESS = 'TICKET_SUCCESS';
const TICKET_FAILURE = 'TICKET_FAILURE';

const ticket = (socket: Socket) => (closure: any) => {
  const { abortEnter } = closure;

  socket.on(TICKET_FAILURE, abortEnter);

  const requestValidation = (param) => socket.emit(TICKET_REQUEST, param);
  const successValidtaion = () => socket.emit(TICKET_SUCCESS);
  const disconnecting = () => {
    socket.off(TICKET_FAILURE);
  };

  return { requestValidation, successValidtaion, disconnecting };
};

export default ticket;
