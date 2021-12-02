import { Socket } from 'socket.io-client';
import {
  STREAM_CHANGE_VIDEO,
  STREAM_CHANGE_AUDIO,
  STREAM_FORCE_CHANGE_VIDEO,
  STREAM_FORCE_CHANGE_AUDIO,
} from 'sooltreaming-domain/constant/socketEvent';

const stream = (socket: Socket) => (closure: any) => {
  const { updateOtherVideo, updateMyVideo, updateOtherAudio, updateMyAudio } = closure;

  socket.on(STREAM_CHANGE_VIDEO, ({ sid, isVideoOn }) => {
    if (sid === socket.id) return;
    updateOtherVideo({ sid, isVideoOn });
  });

  socket.on(STREAM_CHANGE_AUDIO, ({ sid, isAudioOn }) => {
    if (sid === socket.id) return;
    updateOtherAudio({ sid, isAudioOn });
  });

  socket.on(STREAM_FORCE_CHANGE_VIDEO, ({ sid, isVideoOn }) => {
    if (sid === socket.id) updateMyVideo({ isVideoOn });
    else updateOtherVideo({ sid, isVideoOn });
  });

  socket.on(STREAM_FORCE_CHANGE_AUDIO, ({ sid, isAudioOn }) => {
    if (sid === socket.id) updateMyAudio({ isAudioOn });
    else updateOtherAudio({ sid, isAudioOn });
  });

  const videoChange = (isVideoOn) => {
    socket.emit(STREAM_CHANGE_VIDEO, { isVideoOn });
  };

  const audioChange = (isAudioOn) => {
    socket.emit(STREAM_CHANGE_AUDIO, { isAudioOn });
  };

  const disconnecting = () => {
    socket.off(STREAM_CHANGE_VIDEO);
    socket.off(STREAM_CHANGE_AUDIO);
  };

  return { videoChange, audioChange, disconnecting };
};

export default stream;
