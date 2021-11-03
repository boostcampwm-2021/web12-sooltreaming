import React from 'react';
import { HeaderWrapper, HeaderLogo, HeaderUser } from './Header.style.js';
import { useRecoilValue } from 'recoil';
import { userState } from '@src/store/user';

const Header = () => {
  const { id, nickname } = useRecoilValue(userState);

  return (
    <HeaderWrapper>
      <HeaderLogo href="/">
        <img src="images/logo.png" />
        <span>Sooltreaming</span>
      </HeaderLogo>
      <HeaderUser>
        <div className="User-Profile">
          <img src="images/human.svg" />
        </div>
        <span>{nickname || 'judangs'}</span>
      </HeaderUser>
    </HeaderWrapper>
  );
};

export default Header;
