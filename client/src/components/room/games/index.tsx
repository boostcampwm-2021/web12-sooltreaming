import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import UpdownGame from '@components/room/games/UpdownGame';
import useGameSocket from '@hooks/socket/useGameSocket';

type GamesPropTypes = {
  startGamesRef: React.MutableRefObject<Object>;
};

const Games: React.FC<GamesPropTypes> = ({ startGamesRef }) => {
  const currentGame = useSelector((state: RootState) => state.room.currentGame.title);

  const { GameStartHandlerList } = useGameSocket();
  useEffect(() => {
    startGamesRef.current = GameStartHandlerList;
  }, []);

  switch (currentGame) {
    case '업다운':
      return <UpdownGame />;
    default:
      return <></>;
  }
};

export default Games;
