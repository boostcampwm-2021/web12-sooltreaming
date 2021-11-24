import React, { useState, useEffect } from 'react';
import {
  FullScreen,
  HeaderBox,
  Title,
  SecondHeaderBox,
  MenuList,
  Contents,
} from '@src/pages/UserInformation.style.js';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { friendListRequest } from '@src/store/friend';
import MainData from '@src/components/user-information/MainData';

const UserInformation: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [menu, setMenu] = useState<string>('information');

  const goBack = () => {
    history.push('/');
  };

  const information = () => {
    setMenu('information');
  };

  const friend = () => {
    setMenu('friendList');
  };

  const ranking = () => {
    setMenu('ranking');
  };

  useEffect(() => {
    dispatch(friendListRequest([]));
  }, []);

  return (
    <FullScreen>
      <HeaderBox>
        <img src="/images/LeftIcon.png" alt="뒤로가기" onClick={goBack} />
        <Title>마이 페이지</Title>
      </HeaderBox>
      <SecondHeaderBox>
        <MenuList>
          <p className={menu === 'information' ? 'on' : ''} onClick={information}>
            내 정보
          </p>
          <p className={menu === 'friendList' ? 'on' : ''} onClick={friend}>
            친구 목록
          </p>
          <p className={menu === 'ranking' ? 'on' : ''} onClick={ranking}>
            랭킹
          </p>
        </MenuList>
      </SecondHeaderBox>
      <Contents>
        <MainData menu={menu} />
      </Contents>
    </FullScreen>
  );
};

export default UserInformation;
