import React from 'react';
import { LineContainer, LogoLink, UserLink } from './Header.style.js';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { HumanIcon } from '@components/icons';
import { useHistory } from 'react-router-dom';

const Header: React.FC = (): React.ReactElement => {
  const history = useHistory();
  const { id, nickname, imgUrl } = useSelector((state: RootState) => state.user);

  const goToMyPage = () => {
    history.push(`/myPage/${id}`);
  };

  return (
    <LineContainer>
      <LogoLink href="/">
        <img src={'/images/logo.png'} alt="로고" />
        <span>Sooltreaming</span>
      </LogoLink>
      <UserLink onClick={goToMyPage}>
        <div className="User-Profile">
          {!imgUrl ? <HumanIcon /> : <img src={imgUrl} alt="프로필사진" />}
        </div>
        <span>{nickname || 'judangs'}</span>
      </UserLink>
    </LineContainer>
  );
};

export default Header;
