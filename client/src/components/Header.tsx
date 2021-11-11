import React from 'react';
import { Wrapper, LogoLink, UserLink } from './Header.style.js';
import { useRecoilValue } from 'recoil';
import { userState } from '@src/store/user';
import { HumanIcon } from '@components/icons';

const Header: React.FC = () => {
  const { nickname, imgUrl } = useRecoilValue(userState);

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
