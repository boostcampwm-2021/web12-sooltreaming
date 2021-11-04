import { Socket } from 'socket.io-client';

const JOIN_ROOM = 'JOIN_ROOM';
const JOIN_ROOM_ERROR = 'JOIN_ROOM_ERROR';
const ENTER_ALL_USER = 'ENTER_ALL_USER';
const ENTER_ONE_USER = 'ENTER_ONE_USER';
const EXIT_ROOM_USER = 'EXIT_ROOM_USER';

const user = (socket: Socket) => (closure: any) => {
  const { errorControl, setUsers, myID } = closure;

  socket.on(ENTER_ALL_USER, (allUsers) => {
    setUsers(allUsers);
  });
  socket.on(ENTER_ONE_USER, (data) => {
    setUsers((prev) => ({ ...prev, ...data }));
  });
  socket.on(EXIT_ROOM_USER, (id) => {
    if (socket.id !== id)
      setUsers((prev) => {
        const data = { ...prev };
        console.log(data);
        delete data[id];
        return data;
      });
  });
  socket.on(JOIN_ROOM_ERROR, (errorMessage) => {
    errorControl(errorMessage);
  });

  const joinRoom = (myData) => socket.emit(JOIN_ROOM, myData);

  return { joinRoom };
};

export default user;
