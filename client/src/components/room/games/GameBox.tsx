import React, { useState } from 'react';
import { InfoContainer, Title } from '@components/room/games/GameBox.style';
import { GameExplainIcon } from '@components/icons';
import Modal from '@components/custom/Modal';

type GameType = {
  icon: React.ReactNode;
  title: string;
  start: any;
};

const GameBox: React.FC<GameType> = ({ children, icon, title, start }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleExplain = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <InfoContainer onClick={start}>
        <Title>
          {icon}
          {title}
        </Title>
        <div onClick={toggleExplain}>
          <GameExplainIcon />
        </div>
      </InfoContainer>
      <Modal isOpen={isOpen} absolutePos={{ right: '15px' }}>
        {children}
      </Modal>
    </>
  );
};

export default GameBox;
