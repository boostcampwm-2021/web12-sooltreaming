import { useEffect, useMemo, useCallback } from 'react';
import Socket from '@socket/socket';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setCurrentGame } from '@store/room';

const useGame = () => {
  const dispatch = useDispatch();
  const currentGame = useSelector((state: RootState) => state.room.currentGame);
  const onClickUpdown = useCallback(() => {
    socket.requestUpdownStart();
  }, []);
  const onClickRandom = useCallback(() => {}, []);
  const onClickLiar = useCallback(() => {}, []);

  const GameStartHandlerList = {
    랜덤뽑기: onClickRandom,
    업다운: onClickUpdown,
    라이어게임: onClickLiar,
  };

  const startUpdown = (startingSID) => {
    dispatch(setCurrentGame({ title: '업다운', host: startingSID }));
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

export default useGame;
