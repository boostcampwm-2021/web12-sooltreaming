import React, { useState } from 'react';
import Dropdown from '@components/custom/Dropdown';
import {
  Header,
  FriendRankData,
  DropdownWrapper,
} from '@components/user-information/Ranking.style';
import { DownIcon } from '@components/icons';
import { MenuButton, MenuItem } from '@components/setting/SettingDropdown.style';
const rankingMenuList = {
  '총 접속 시간': 'totalSeconds',
  '갈고리 사용 횟수': 'hookCount',
  '총 채팅 횟수': 'chatCount',
  '투표 선정 횟수': 'pollCount',
  '클로즈업 횟수': 'closeupCount',
  '단두대 횟수': 'dieCount',
  '주최자 횟수': 'starterCount',
};

const Ranking: React.FC = () => {
  const [nowSelect, setNowSelect] = useState('갈고리 사용 횟수');

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
          itemList={Object.keys(rankingMenuList)}
        />
      </DropdownWrapper>
      <FriendRankData>
        <h2> To Be Continue... </h2>
      </FriendRankData>
    </>
  );
};

export default Ranking;
