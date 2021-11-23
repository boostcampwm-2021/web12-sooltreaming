import { Socket } from 'socket.io-client';
import {
  JOIN_ROOM,
  JOIN_ROOM_ERROR,
  ENTER_ALL_USER,
  ENTER_ONE_USER,
  EXIT_ROOM_USER,
  CHANGE_HOST,
} from 'sooltreaming-domain/constant/socketEvent';

const user = (socket: Socket) => (closure: any) => {
  const { errorControl, addUser, deleteUser, initUsers, changeRoomHost } = closure;

  socket.on(ENTER_ALL_USER, (allUsers, allUsersDevices) => {
    initUsers({ users: { ...allUsers }, usersDevices: { ...allUsersDevices } });
  });
  socket.on(ENTER_ONE_USER, (user, userDevices, sid) => {
    addUser({ user, userDevices, sid });
  });
  socket.on(EXIT_ROOM_USER, (id) => {
    if (socket.id === id) return;
    deleteUser(id);
  });
  socket.on(CHANGE_HOST, (isOpen) => {
    changeRoomHost(isOpen);
  });

  socket.on(JOIN_ROOM_ERROR, (errorMessage) => {
    errorControl(errorMessage);
  });

  const joinRoom = (myData) => socket.emit(JOIN_ROOM, myData);

  const disconnecting = () => {
    socket.off(ENTER_ALL_USER);
    socket.off(ENTER_ONE_USER);
    socket.off(EXIT_ROOM_USER);
    socket.off(JOIN_ROOM_ERROR);
    socket.off(CHANGE_HOST);
  };

  return { joinRoom, disconnecting };
};

export default user;
