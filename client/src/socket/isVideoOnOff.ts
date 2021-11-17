import { Socket } from 'socket.io-client';

const VIDEO_CHANGE = 'VIDEO_CHANGE';

const isVideoOnOff = (socket: Socket) => (closure: any) => {
  const { errorControl, users, setUsers } = closure;

  socket.on(VIDEO_CHANGE, (mydata) => {
    const { sid, nowVideoOn } = mydata;
    setUsers((prev) => {
      const newUserData = { ...prev[sid], isVideoOn: nowVideoOn };
      const newState = { ...prev, [sid]: newUserData };
      return newState;
    });
  });

  const videoChange = (mydata) => {
    socket.emit(VIDEO_CHANGE, mydata);
  };

  const disconnecting = () => {
    socket.off(VIDEO_CHANGE);
  };

  return { videoChange, disconnecting };
};

export default isVideoOnOff;
