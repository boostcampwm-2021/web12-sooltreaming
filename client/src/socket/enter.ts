import { Socket } from 'socket.io-client';
import {
  ENTER_ROOM,
  ENTER_ROOM_ERROR,
  ENTER_ALL_USER,
  ENTER_ONE_USER,
  DISCONNECT_USER,
  ENTER_CHANGE_HOST,
} from 'sooltreaming-domain/constant/socketEvent';

const enter = (socket: Socket) => (closure: any) => {
  const { errorControl, addUser, deleteUser, initUsers, changeRoomHost, updateFriendList } =
    closure;

  socket.on(ENTER_ALL_USER, (allUsers, allUsersDevices) => {
    initUsers({ users: { ...allUsers }, usersDevices: { ...allUsersDevices } });
  });
  socket.on(ENTER_ONE_USER, (user, userDevices, sid) => {
    addUser({ user, userDevices, sid });
    updateFriendList();
  });
  socket.on(DISCONNECT_USER, (id) => {
    if (socket.id === id) return;
    deleteUser(id);
  });
  socket.on(ENTER_CHANGE_HOST, (isOpen) => {
    changeRoomHost(isOpen);
  });

  socket.on(ENTER_ROOM_ERROR, (errorMessage) => {
    errorControl(errorMessage);
  });

  const joinRoom = (myData) => socket.emit(ENTER_ROOM, myData);

  const disconnecting = () => {
    socket.off(ENTER_ROOM_ERROR);
    socket.off(ENTER_ALL_USER);
    socket.off(ENTER_ONE_USER);
    socket.off(DISCONNECT_USER);
    socket.off(ENTER_CHANGE_HOST);
  };

  return { joinRoom, disconnecting };
};

export default enter;
