import { useEffect, useMemo, useCallback, useRef } from 'react';
import Socket from '@socket/socket';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setCurrentGame } from '@store/room';
import { LIAR, UP_DOWN } from 'sooltreaming-domain/constant/gameName';

const useGameSocket = () => {
  const dispatch = useDispatch();
  const currentGame = useSelector((state: RootState) => state.room.currentGame);
  const randomNumRef = useRef('');

  const onClickUpdown = useCallback(() => {
    socket.requestUpdownStart();
  }, []);
  const onClickLiar = useCallback(() => {
    socket.requestLiarStart();
  }, []);

  const GameStartHandlerList = useMemo(
    () => ({
      [UP_DOWN]: onClickUpdown,
      [LIAR]: onClickLiar,
    }),
    [],
  );

  const startUpdown = (startingSID) => {
    dispatch(setCurrentGame({ title: UP_DOWN, host: startingSID }));
  };

  const stopUpdown = () => {
    dispatch(setCurrentGame({ title: '', host: '' }));
  };

  const startLiar = (startingSID) => {
    dispatch(setCurrentGame({ title: LIAR, host: startingSID }));
  };

  const stopLiar = () => {
    dispatch(setCurrentGame({ title: '', host: '' }));
  };

  const socket = useMemo(
    () => Socket.game({ startUpdown, stopUpdown, startLiar, stopLiar, randomNumRef }),
    [],
  );

  useEffect(() => {
    if (currentGame.host === Socket.getSID() && !currentGame.title) {
      socket.requestUpdownStop();
      socket.requestLiarStop();
    }
  }, [currentGame]);

  useEffect(() => {
    return () => {
      socket.disconnecting();
    };
  }, []);

  return { GameStartHandlerList, randomNumRef };
};

export default useGameSocket;
