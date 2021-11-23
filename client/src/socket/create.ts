import { Socket } from 'socket.io-client';
import { CREATE_REQUEST, CREATE_SUCCESS } from 'sooltreaming-domain/constant/socketEvent';

const create = (socket: Socket) => (closure: any) => {
  const { joining } = closure;

  socket.on(CREATE_SUCCESS, joining);

  const createRoom = () => socket.emit(CREATE_REQUEST);

  const disconnecting = () => {
    socket.off(CREATE_SUCCESS);
  };

  return { createRoom, disconnecting };
};

export default create;
