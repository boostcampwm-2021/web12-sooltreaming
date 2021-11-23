import React, { useMemo } from 'react';
import { GameListBox } from '@components/room/games/GameMenu.style';
import GameBox from '@components/room/games/GameBox';
import { GameIcon } from '@components/icons';

type GameMenuPropTypes = {
  startGamesRef: React.MutableRefObject<Object>;
};
const GameMenu: React.FC<GameMenuPropTypes> = ({ startGamesRef }) => {
  const GameList = useMemo(
    () => [
      //아이콘, 설명은 임시
      { icon: <GameIcon />, title: '랜덤뽑기', content: '설명' },
      { icon: <GameIcon />, title: '업다운', content: '설명' },
      { icon: <GameIcon />, title: '라이어게임', content: '설명' },
    ],
    [],
  );

  return (
    <GameListBox>
      {GameList.map(({ icon, title, content }) => (
        <GameBox key={title} icon={icon} title={title} start={startGamesRef.current[title]}>
          {content}
        </GameBox>
      ))}
    </GameListBox>
  );
};

export default GameMenu;
