import { Socket } from 'socket.io-client';

const START_UPDOWN = 'START_UPDOWN';
const STOP_UPDOWN = 'STOP_UPDOWN';
const game =
  (socket: Socket) =>
  ({ startUpdown, stopUpdown }) => {
    socket.on(START_UPDOWN, (startingSID) => {
      startUpdown(startingSID);
    });
    socket.on(STOP_UPDOWN, () => {
      stopUpdown();
    });
    const requestUpdownStart = () => {
      socket.emit(START_UPDOWN, socket.id);
    };
    const requestUpdownStop = () => {
      socket.emit(STOP_UPDOWN);
    };
    const disconnecting = () => {
      socket.off(START_UPDOWN);
      socket.off(STOP_UPDOWN);
    };
    return {
      requestUpdownStart,
      requestUpdownStop,
      disconnecting,
    };
  };

export default game;
