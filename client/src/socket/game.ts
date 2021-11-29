import { Socket } from 'socket.io-client';
import { UPDOWN_START, UPDOWN_STOP } from 'sooltreaming-domain/constant/socketEvent';

const game =
  (socket: Socket) =>
  ({ startUpdown, stopUpdown, randomNumRef }) => {
    socket.on(UPDOWN_START, (startingSID, randomNum) => {
      randomNumRef.current = randomNum;
      startUpdown(startingSID);
    });
    socket.on(UPDOWN_STOP, () => {
      randomNumRef.current = '';
      stopUpdown();
    });
    const requestUpdownStart = () => {
      socket.emit(UPDOWN_START, socket.id);
    };
    const requestUpdownStop = () => {
      socket.emit(UPDOWN_STOP);
    };
    const disconnecting = () => {
      socket.off(UPDOWN_START);
      socket.off(UPDOWN_STOP);
    };
    return {
      requestUpdownStart,
      requestUpdownStop,
      disconnecting,
    };
  };

export default game;
