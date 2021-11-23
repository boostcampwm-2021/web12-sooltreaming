import React, { useState } from 'react';
import { Wrapper, TitleWrapper } from '@components/room/games/GameBox.style';
import { GameExplainIcon } from '@components/icons';
import Modal from '@components/custom/Modal';

type GameType = {
  icon: React.ReactNode;
  title: string;
  explain: string;
  start: any;
};

const GameBox: React.FC<GameType> = ({ icon, title, explain, start }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleExplain = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <Wrapper onClick={start}>
        <TitleWrapper>
          {icon}
          {title}
        </TitleWrapper>
        <div onClick={toggleExplain}>
          <GameExplainIcon />
        </div>
      </Wrapper>
      <Modal children={explain} isOpen={isOpen} absolutePos={{ right: '15px' }} />
    </>
  );
};

export default GameBox;
