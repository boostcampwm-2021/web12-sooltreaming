import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import UpdownGame from '@components/room/games/UpdownGame';
import useGameSocket from '@hooks/socket/useGameSocket';
import type { GamesPropType } from '@ts-types/components/room';

const Games: React.FC<GamesPropType> = ({ startGamesRef }) => {
  const currentGame = useSelector((state: RootState) => state.room.currentGame.title);
  const { GameStartHandlerList, randomNumRef } = useGameSocket();

  useEffect(() => {
    startGamesRef.current = GameStartHandlerList;
  }, []);

  switch (currentGame) {
    case '업다운':
      return <UpdownGame randomNumRef={randomNumRef} />;
    default:
      return <></>;
  }
};

export default Games;
