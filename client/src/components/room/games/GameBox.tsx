import React, { useState } from 'react';
import { InfoContainer, Title } from '@components/room/games/GameBox.style';
import { GameRuleIcon } from '@components/icons';
import Modal from '@components/custom/Modal';

type GameType = {
  icon: React.ReactNode;
  title: string;
  start: any;
};

const GameBox: React.FC<GameType> = ({ children, icon, title, start }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleRule = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };
  const closeRule = () => {
    setIsOpen(false);
  };

  return (
    <>
      <InfoContainer onClick={start}>
        <Title>
          {icon}
          {title}게임
        </Title>
        <div onClick={toggleRule} onBlur={closeRule} tabIndex={0}>
          <GameRuleIcon />
        </div>
      </InfoContainer>
      <Modal isOpen={isOpen} absolutePos={{ right: '15px' }}>
        {children}
      </Modal>
    </>
  );
};

export default GameBox;
