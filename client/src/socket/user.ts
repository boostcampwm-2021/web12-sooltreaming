import { Socket } from 'socket.io-client';

const CREATE_ROOM = 'CREATE_ROOM';
const JOIN_ROOM = 'JOIN_ROOM';
const JOIN_ROOM_ERROR = 'JOIN_ROOM_ERROR';
const ENTER_ALL_USER = 'ENTER_ALL_USER';
const ENTER_ONE_USER = 'ENTER_ONE_USER';
const EXIT_ROOM_USER = 'EXIT_ROOM_USER';

const user = (socket: Socket) => (closure: any) => {
  const { setMessage, pushState, setUsers, myID } = closure;

  socket.on(ENTER_ALL_USER, (allUsers) => {
    setUsers(allUsers);
  });
  socket.on(ENTER_ONE_USER, ({ id, ...datas }) => {
    setUsers((prev) => ({ ...prev, [id]: datas }));
  });
  socket.on(EXIT_ROOM_USER, ({ id, ...datas }) => {
    if (myID !== id)
      setUsers((prev) => {
        const data = { ...prev };
        delete data[id];
        return data;
      });
  });

  socket.on(JOIN_ROOM_ERROR, (errorMessage) => {
    setMessage(errorMessage);
  });

  socket.on(JOIN_ROOM, (roomCode) => {
    pushState(roomCode);
  });

  const joinRoom = (myData) => socket.emit(JOIN_ROOM, myData);
  const createRoom = (myData) => socket.emit(CREATE_ROOM, myData);

  return { joinRoom, createRoom };
};

export default user;
