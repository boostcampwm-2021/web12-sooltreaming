import { Socket } from 'socket.io-client';

const AUTHORITY_ERROR = 'AUTHORITY_ERROR';
const TOGGLE_ROOM_ENTRY = 'TOGGLE_ROOM_ENTRY';
const TURN_OFF_OTHER_VIDEO = 'TURN_OFF_OTHER_VIDEO';
const TURN_OFF_OTHER_AUDIO = 'TURN_OFF_OTHER_AUDIO';

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
  }

  const turnOffOtherAudio = ({ sid, isAudioOn }) => {
    socket.emit(TURN_OFF_OTHER_AUDIO, { sid, isAudioOn });
  }

  const disconnecting = () => {
    socket.off(TOGGLE_ROOM_ENTRY);
  };

  return { toggleRoomEntry, turnOffOtherVideo, turnOffOtherAudio, disconnecting };
};

export default roomControl;
