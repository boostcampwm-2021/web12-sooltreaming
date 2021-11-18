import { Socket } from 'socket.io-client';

const CHANGE_VIDEO = 'CHANGE_VIDEO';
const CHANGE_AUDIO = 'CHANGE_AUDIO';

const isStreamOnOFf = (socket: Socket) => (closure: any) => {
  const { errorControl, updateOtherVideo, updateMyVideo, updateOtherAudio, updateMyAudio } = closure;

  socket.on(CHANGE_VIDEO, ({ sid, isVideoOn }) => {
    updateOtherVideo({ sid, isVideoOn });
    if(sid === socket.id)
      updateMyVideo({ isVideoOn });
  });

  socket.on(CHANGE_AUDIO, ({ sid, isAudioOn }) => {
    updateOtherAudio({ sid, isAudioOn });
    if(sid === socket.id)
      updateMyAudio({ isAudioOn });
  });

  const videoChange = (isVideoOn) => {
    socket.emit(CHANGE_VIDEO, { isVideoOn });
  };

  const audioChange = (isAudioOn) => {
    socket.emit(CHANGE_AUDIO, { isAudioOn });
  };

  const disconnecting = () => {
    socket.off(CHANGE_VIDEO);
    socket.off(CHANGE_AUDIO);
  };

  return { videoChange, audioChange, disconnecting };
};

export default isStreamOnOFf;