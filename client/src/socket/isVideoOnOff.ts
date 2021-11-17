import { Socket } from 'socket.io-client';

const VIDEO_CHANGE = 'VIDEO_CHANGE';

const isVideoOnOff = (socket: Socket) => (closure: any) => {
  const { errorControl, users, setUsers } = closure;

  socket.on(VIDEO_CHANGE, (mydata) => {
    let temp = users;
    const { sid, nowVideoOn } = mydata;
    Object.entries(users).map((user) => {
      if (user[0] === sid) temp[sid].isVideoOn = nowVideoOn; // 이렇게 불변성 유지하는거 맞나..?!
      setUsers({ ...temp });
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
