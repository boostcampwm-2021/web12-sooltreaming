import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import UpdownGame from '@components/room/games/UpdownGame';
import useGameSocket from '@hooks/socket/useGameSocket';
import type { GamesPropType } from '@ts-types/components/room';
import LiarGame from '@components/room/games/LiarGame';
import RandomPickGame from '@components/room/games/RandomPickGame';

const Games: React.FC<GamesPropType> = ({ startGamesRef }): React.ReactElement => {
  const currentGame = useSelector((state: RootState) => state.room.currentGame.title);
  const { GameStartHandlerList, randomNumRef, keywordRef, onePickRef } = useGameSocket();

  useEffect(() => {
    startGamesRef.current = GameStartHandlerList;
  }, []);

  switch (currentGame) {
    case '업다운':
      return <UpdownGame randomNumRef={randomNumRef} />;
    case '라이어':
      return <LiarGame keywordRef={keywordRef} />;
    case '랜덤픽':
      return <RandomPickGame onePickRef={onePickRef} />;
    default:
      return <></>;
  }
};

export default Games;
