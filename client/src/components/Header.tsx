import React from 'react';
import { Wrapper, LogoLink, UserLink } from './Header.style.js';
import { useRecoilValue } from 'recoil';
import { userState } from '@src/store/user';

const Header: React.FC = () => {
  const { id, nickname } = useRecoilValue(userState);

  return (
    <Wrapper>
      <LogoLink href="/">
        <img src="images/logo.png" />
        <span>Sooltreaming</span>
      </LogoLink>
      <UserLink>
        <div className="User-Profile">
          <img src="images/human.svg" />
        </div>
        <span>{nickname || 'judangs'}</span>
      </UserLink>
    </Wrapper>
  );
};

export default Header;
