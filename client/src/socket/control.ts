import { Socket } from 'socket.io-client';
import {
  CONTROL_AUTHORITY_ERROR,
  CONTROL_TOGGLE_ENTRY,
  CONTROL_OTHER_VIDEO_OFF,
  CONTROL_OTHER_AUDIO_OFF,
} from 'sooltreaming-domain/constant/socketEvent';

const control = (socket: Socket) => (closure: any) => {
  const { errorControl, changeIsOpen } = closure;

  socket.on(CONTROL_AUTHORITY_ERROR, (message) => {
    errorControl(message);
  });

  socket.on(CONTROL_TOGGLE_ENTRY, (result) => {
    if (!result) return;
    changeIsOpen();
  });

  const toggleRoomEntry = () => {
    socket.emit(CONTROL_TOGGLE_ENTRY);
  };

  const turnOffOtherVideo = ({ sid, isVideoOn }) => {
    socket.emit(CONTROL_OTHER_VIDEO_OFF, { sid, isVideoOn });
  };

  const turnOffOtherAudio = ({ sid, isAudioOn }) => {
    socket.emit(CONTROL_OTHER_AUDIO_OFF, { sid, isAudioOn });
  };

  const disconnecting = () => {
    socket.off(CONTROL_TOGGLE_ENTRY);
  };

  return { toggleRoomEntry, turnOffOtherVideo, turnOffOtherAudio, disconnecting };
};

export default control;
