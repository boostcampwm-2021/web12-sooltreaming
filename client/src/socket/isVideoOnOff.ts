import { Socket } from 'socket.io-client';

const VIDEO_CHANGE = 'VIDEO_CHANGE';

const isVideoOnOff = (socket: Socket) => (closure: any) => {
  const { errorControl, updateOtherVideo } = closure;

  socket.on(VIDEO_CHANGE, ({ sid, isVideoOn }) => {
    updateOtherVideo({ sid, isVideoOn });
  });

  const videoChange = (isVideoOn) => {
    socket.emit(VIDEO_CHANGE, { isVideoOn });
  };

  const disconnecting = () => {
    socket.off(VIDEO_CHANGE);
  };

  return { videoChange, disconnecting };
};

export default isVideoOnOff;
