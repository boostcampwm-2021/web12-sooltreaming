import { Socket } from 'socket.io-client';

const AUTHORITY_ERROR = 'AUTHORITY_ERROR';
const TOGGLE_ROOM_ENTRY = 'TOGGLE_ROOM_ENTRY';

const roomControl = (socket: Socket) => (closure: any) => {
  
  const { errorControl, toggleIsOpen } = closure;

  socket.on(AUTHORITY_ERROR, (message) => {
    errorControl(message);
  });

  socket.on(TOGGLE_ROOM_ENTRY, (result) => {
    if(!result)
      return;
    toggleIsOpen();
  });

  const toggleRoomEntry = (chatRoomCode) => socket.emit(TOGGLE_ROOM_ENTRY, {chatRoomCode});

  const disconnecting = () => {
    socket.off(TOGGLE_ROOM_ENTRY);
  };

  return { toggleRoomEntry, disconnecting };
};

export default roomControl;
