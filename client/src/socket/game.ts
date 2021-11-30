import { Socket } from 'socket.io-client';
import {
  UPDOWN_START,
  UPDOWN_STOP,
  LIAR_START,
  LIAR_STOP,
} from 'sooltreaming-domain/constant/socketEvent';

const game =
  (socket: Socket) =>
  ({ startUpdown, stopUpdown, startLiar, randomNumRef, keywordRef }) => {
    socket.on(UPDOWN_START, (startingSID, randomNum) => {
      randomNumRef.current = randomNum;
      startUpdown(startingSID);
    });
    socket.on(UPDOWN_STOP, () => {
      randomNumRef.current = '';
      stopUpdown();
    });

    socket.on(LIAR_START, (startingSID, keyword) => {
      keywordRef.current = keyword;
      startLiar(startingSID);
    });
    socket.on(LIAR_STOP, () => {
      keywordRef.current = '';
      stopUpdown();
    });

    // 업다운 시작과 끝
    const requestUpdownStart = () => {
      socket.emit(UPDOWN_START, socket.id);
    };
    const requestUpdownStop = () => {
      socket.emit(UPDOWN_STOP);
    };

    // 라이어 시작과 끝
    const requestLiarStart = () => {
      socket.emit(LIAR_START, socket.id);
    };
    const requestLiarStop = () => {
      socket.emit(LIAR_STOP);
    };

    const disconnecting = () => {
      socket.off(UPDOWN_START);
      socket.off(UPDOWN_STOP);
      socket.off(LIAR_START);
      socket.off(LIAR_STOP);
    };
    return {
      requestUpdownStart,
      requestUpdownStop,
      requestLiarStart,
      requestLiarStop,
      disconnecting,
    };
  };

export default game;
