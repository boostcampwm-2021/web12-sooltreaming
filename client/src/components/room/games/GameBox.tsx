import React, { useState } from 'react';
import { InfoContainer, Title } from '@components/room/games/GameBox.style';
import { GameRuleIcon } from '@components/icons';
import Modal from '@components/custom/Modal';
import type { GameBoxPropType } from '@ts-types/components/room';

const GameBox: React.FC<GameBoxPropType> = ({
  children,
  icon,
  title,
  start,
}): React.ReactElement => {
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
