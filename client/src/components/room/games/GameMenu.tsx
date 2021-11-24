import React, { useMemo } from 'react';
import { GameListBox } from '@components/room/games/GameMenu.style';
import GameBox from '@components/room/games/GameBox';
import { gameList } from '@src/components/room/games/gameList';

type GameMenuPropTypes = {
  startGamesRef: React.MutableRefObject<Object>;
};

const GameMenu: React.FC<GameMenuPropTypes> = ({ startGamesRef }) => {
  return (
    <GameListBox>
      {gameList.map(({ icon, title, content }) => (
        <GameBox key={title} icon={icon} title={title} start={startGamesRef.current[title]}>
          {content}
        </GameBox>
      ))}
    </GameListBox>
  );
};

export default GameMenu;
