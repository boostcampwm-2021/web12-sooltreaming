import React from 'react';
import { LineContainer, LogoLink, RightBox, UserLink, LogoutContainer } from './Header.style.js';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { HumanIcon, LogoutIcon } from '@components/icons';
import { useHistory } from 'react-router-dom';
import { logoutAPI } from '@api/user';
import { resetUser } from '@store/user';

const Header: React.FC = (): React.ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, nickname, imgUrl } = useSelector((state: RootState) => state.user);

  const goToMyPage = () => {
    history.push(`/myPage/${id}`);
  };

  const logout = async (e) => {
    e.stopPropagation();
    logoutAPI(() => {
      dispatch(resetUser({}));
      history.push('/login');
    });
  };

  return (
    <LineContainer>
      <LogoLink href="/">
        <img src={'/images/logo.png'} alt="로고" />
        <span>Sooltreaming</span>
      </LogoLink>
      <RightBox>
        <UserLink onClick={goToMyPage}>
          <div className="User-Profile">
            {!imgUrl ? <HumanIcon /> : <img src={imgUrl} alt="프로필사진" />}
          </div>
          <span>{nickname || 'judangs'}</span>
        </UserLink>
        <LogoutContainer onClick={logout}>
          <LogoutIcon />
        </LogoutContainer>
      </RightBox>
    </LineContainer>
  );
};

export default Header;
