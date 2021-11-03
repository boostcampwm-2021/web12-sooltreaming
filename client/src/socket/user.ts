import { Socket } from 'socket.io-client';

const JOIN_ROOM = 'JOIN_ROOM';
const ENTER_ALL_USER = 'ENTER_ALL_USER';
const ENTER_ONE_USER = 'ENTER_ONE_USER';
const EXIT_ROOM_USER = 'EXIT_ROOM_USER';

const user = (socket: Socket) => (closure: any) => {
  const { setUsers, myID } = closure;

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

  const joinRoom = (myData) => socket.emit(JOIN_ROOM, myData);
  return { joinRoom };
};

export default user;
