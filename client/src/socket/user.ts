import { Socket } from 'socket.io-client';

const JOIN_ROOM = 'JOIN_ROOM';
const JOIN_ROOM_ERROR = 'JOIN_ROOM_ERROR';
const ENTER_ALL_USER = 'ENTER_ALL_USER';
const ENTER_ONE_USER = 'ENTER_ONE_USER';
const EXIT_ROOM_USER = 'EXIT_ROOM_USER';
const CHANGE_HOST = 'CHANGE_HOST';

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