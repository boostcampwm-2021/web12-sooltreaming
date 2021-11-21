import React, { useState } from 'react';
import Dropdown from '@components/custom/Dropdown';
import {
  Header,
  FriendRankData,
  DropdownWrapper,
} from '@components/user-information/Ranking.style';
import { DownIcon } from '@components/icons';
import { MenuButton, MenuItem } from '@components/setting/SettingDropdown.style';

const Ranking: React.FC = () => {
  const [nowSelect, setNowSelect] = useState('갈고리 사용 횟수');
  const rankingMenuList = [
    '총 접속 시간',
    '갈고리 사용 횟수',
    '총 채팅 횟수',
    '투표 선정 횟수',
    '클로즈업 횟수',
    '단두대 횟수',
    '단두대 확률',
    '건배사 횟수',
    '주최자 횟수',
    '총 접속 시간',
  ];

  const choiceMenu = (toggleDropdown, item) => () => {
    setNowSelect(item);
    toggleDropdown();
  };

  return (
    <>
      <Header>
        <img src="/images/logo.png" alt="메인 술잔" />
      </Header>
      <DropdownWrapper>
        <Dropdown
          renderButton={() => (
            <MenuButton>
              <span>{nowSelect}</span>
              <DownIcon />
            </MenuButton>
          )}
          renderItem={({ closeDropdown, item }) => (
            <MenuItem key={item} onClick={choiceMenu(closeDropdown, item)}>
              {item}
            </MenuItem>
          )}
          itemList={rankingMenuList}
        />
      </DropdownWrapper>
      <FriendRankData>
        <h2> To Be Continue... </h2>
      </FriendRankData>
    </>
  );
};

export default Ranking;
