import { Socket } from 'socket.io-client';
import { UPDOWN_START, LIAR_START, GAME_STOP } from 'sooltreaming-domain/constant/socketEvent';

const game =
  (socket: Socket) =>
  ({ startUpdown, startLiar, stopGame, randomNumRef, keywordRef }) => {
    socket.on(UPDOWN_START, (startingSID, randomNum) => {
      randomNumRef.current = randomNum;
      startUpdown(startingSID);
    });

    socket.on(LIAR_START, (startingSID, keyword) => {
      keywordRef.current = keyword;
      startLiar(startingSID);
    });
    socket.on(GAME_STOP, () => {
      keywordRef.current = '';
      stopGame();
    });

    // 게임 시작과 끝
    const requestUpdownStart = () => {
      socket.emit(UPDOWN_START, socket.id);
    };
    const requestLiarStart = () => {
      socket.emit(LIAR_START, socket.id);
    };
    const requestGameStop = () => {
      socket.emit(GAME_STOP);
    };

    const disconnecting = () => {
      socket.off(UPDOWN_START);
      socket.off(LIAR_START);
      socket.off(GAME_STOP);
    };
    return {
      requestUpdownStart,
      requestLiarStart,
      requestGameStop,
      disconnecting,
    };
  };

export default game;
