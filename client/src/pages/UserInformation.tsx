import React, { useState } from 'react';
import {
  Wrapper,
  MyPageHeaderWrapper,
  MyPageHeader,
  MyPageSecondHeaderWrapper,
  MyPageSecondHeader,
  MainDataWrapper,
} from '@src/pages/UserInformation.style.js';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import MainData from '@src/components/user-information/MainData';

const UserInformation: React.FunctionComponent = () => {
  const history = useHistory();
  const nickname = useSelector((state: RootState) => state.user.nickname);
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

  return (
    <Wrapper>
      <MyPageHeaderWrapper>
        <img src="/images/LeftIcon.png" alt="뒤로가기" onClick={goBack} />
        <MyPageHeader>마이 페이지</MyPageHeader>
      </MyPageHeaderWrapper>
      <MyPageSecondHeaderWrapper>
        <MyPageSecondHeader>
          <p className={menu === 'information' ? 'on' : ''} onClick={information}>
            내 정보
          </p>
          <p className={menu === 'friendList' ? 'on' : ''} onClick={friend}>
            친구 목록
          </p>
          <p className={menu === 'ranking' ? 'on' : ''} onClick={ranking}>
            랭킹
          </p>
        </MyPageSecondHeader>
      </MyPageSecondHeaderWrapper>
      <MainDataWrapper>
        <MainData menu={menu} />
      </MainDataWrapper>
    </Wrapper>
  );
};

export default UserInformation;
