import { Socket } from 'socket.io-client';
import {
  TICKET_REQUEST,
  TICKET_SUCCESS,
  TICKET_FAILURE,
} from 'sooltreaming-domain/constant/socketEvent';

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
