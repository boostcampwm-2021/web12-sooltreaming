import React from 'react';
import { Wrapper, LogoLink, UserLink } from './Header.style.js';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { HumanIcon } from '@components/icons';

const Header: React.FC = () => {
  const { nickname, imgUrl } = useSelector((state: RootState) => state.user);

  return (
    <Wrapper>
      <LogoLink href="/">
        <img src={'/images/logo.png'} />
        <span>Sooltreaming</span>
      </LogoLink>
      <UserLink>
        <div className="User-Profile">{!imgUrl ? <HumanIcon /> : <img src={imgUrl} />}</div>
        <span>{nickname || 'judangs'}</span>
      </UserLink>
    </Wrapper>
  );
};

export default Header;
