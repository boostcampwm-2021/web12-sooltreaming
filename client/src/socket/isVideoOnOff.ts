import { Socket } from 'socket.io-client';

const CHANGE_VIDEO = 'CHANGE_VIDEO';

const isVideoOnOff = (socket: Socket) => (closure: any) => {
  const { errorControl, updateOtherVideo, updateMyVideo } = closure;

  socket.on(CHANGE_VIDEO, ({ sid, isVideoOn }) => {
    updateOtherVideo({ sid, isVideoOn });
    if(sid === socket.id)
      updateMyVideo({ isVideoOn });
  });

  const videoChange = (isVideoOn) => {
    socket.emit(CHANGE_VIDEO, { isVideoOn });
  };

  const disconnecting = () => {
    socket.off(CHANGE_VIDEO);
  };

  return { videoChange, disconnecting };
};

export default isVideoOnOff;