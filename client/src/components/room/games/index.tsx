import React from 'react';
import { Wrapper } from '@components/room/games/index.style';
import GameBox from '@components/room/games/GameBox';
import { GameIcon } from '@components/icons';

const GameList = [
  //아이콘, 설명은 임시
  { icon: <GameIcon />, title: '랜덤뽑기', explain: '설명' },
  { icon: <GameIcon />, title: '업다운', explain: '설명' },
  { icon: <GameIcon />, title: '라이어게임', explain: '설명' },
];

const Games: React.FC = () => {
  return (
    <Wrapper>
      {GameList.map(({ icon, title, explain }) => (
        <GameBox icon={icon} title={title} explain={explain} />
      ))}
    </Wrapper>
  );
};

export default Games;
