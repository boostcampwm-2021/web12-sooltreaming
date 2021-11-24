import { useEffect, useMemo, useCallback } from 'react';
import Socket from '@socket/socket';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setCurrentGame } from '@store/room';
import { LIAR, UP_DOWN } from 'sooltreaming-domain/constant/gameName';

const useGameSocket = () => {
  const dispatch = useDispatch();
  const currentGame = useSelector((state: RootState) => state.room.currentGame);

  const onClickUpdown = useCallback(() => {
    socket.requestUpdownStart();
  }, []);
  const onClickLiar = useCallback(() => {}, []);

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

  const socket = useMemo(() => Socket.game({ startUpdown, stopUpdown }), []);
  useEffect(() => {
    if (currentGame.host === Socket.getSID() && !currentGame.title) {
      socket.requestUpdownStop();
    }
  }, [currentGame]);

  useEffect(() => {
    return () => {
      socket.disconnecting();
    };
  }, []);

  return { GameStartHandlerList };
};

export default useGameSocket;
