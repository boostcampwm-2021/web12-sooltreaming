import { Socket } from 'socket.io-client';
import {
  AUTHORITY_ERROR,
  TOGGLE_ROOM_ENTRY,
  TURN_OFF_OTHER_VIDEO,
  TURN_OFF_OTHER_AUDIO,
} from 'sooltreaming-domain/constant/socketEvent';

const roomControl = (socket: Socket) => (closure: any) => {
  const { errorControl, changeIsOpen } = closure;

  socket.on(AUTHORITY_ERROR, (message) => {
    errorControl(message);
  });

  socket.on(TOGGLE_ROOM_ENTRY, (result) => {
    if (!result) return;
    changeIsOpen();
  });

  const toggleRoomEntry = () => {
    socket.emit(TOGGLE_ROOM_ENTRY);
  };

  const turnOffOtherVideo = ({ sid, isVideoOn }) => {
    socket.emit(TURN_OFF_OTHER_VIDEO, { sid, isVideoOn });
  };

  const turnOffOtherAudio = ({ sid, isAudioOn }) => {
    socket.emit(TURN_OFF_OTHER_AUDIO, { sid, isAudioOn });
  };

  const disconnecting = () => {
    socket.off(TOGGLE_ROOM_ENTRY);
  };

  return { toggleRoomEntry, turnOffOtherVideo, turnOffOtherAudio, disconnecting };
};

export default roomControl;
