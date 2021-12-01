import React from 'react';
import { GameListBox, GameRuleBox, GameTitle } from '@components/room/games/GameMenu.style';
import GameBox from '@components/room/games/GameBox';
import { gameList } from '@src/components/room/games/gameList';
import type { GamesPropType } from '@ts-types/components/room';

const GameMenu: React.FC<GamesPropType> = ({ startGamesRef }): React.ReactElement => {
  return (
    <GameListBox>
      {gameList.map(({ icon, title, content }) => (
        <GameBox key={title} icon={icon} title={title} start={startGamesRef.current[title]}>
          <GameRuleBox>
            <GameTitle>{title} 게임 설명서</GameTitle>
            {content}
          </GameRuleBox>
        </GameBox>
      ))}
    </GameListBox>
  );
};

export default GameMenu;
