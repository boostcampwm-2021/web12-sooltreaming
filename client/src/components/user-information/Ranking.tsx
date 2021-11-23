import React, { useEffect, useState } from 'react';
import Dropdown from '@components/custom/Dropdown';
import {
  Header,
  FriendRankData,
  DropdownWrapper,
  FriendRankBox,
  RankNum,
} from '@components/user-information/Ranking.style';
import { DownIcon } from '@components/icons';
import { MenuButton, MenuItem } from '@components/setting/SettingDropdown.style';
import { API } from '@api/index';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';

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
  const friendList = useSelector((state: RootState) => state.friend.friendList);
  const myId = useSelector((state: RootState) => state.user.id);
  const [nowSelect, setNowSelect] = useState('갈고리 사용 횟수');
  const [rank, setRank] = useState([]);
  const choiceMenu = (toggleDropdown, item) => () => {
    setNowSelect(item);
    toggleDropdown();
  };

  useEffect(() => {
    const getRank = async () => {
      const rank = await API.call(API.TYPE.GET_RANK, rankingMenuList[nowSelect]);
      setRank(rank);
    };
    getRank();
  }, [nowSelect]);

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
        {Object.values(rank)
          .filter(({ _id }) => [...friendList, myId].includes(_id))
          .map((friendInfo: any, index) => (
            <FriendRankBox key={friendInfo._id} className={friendInfo._id === myId ? 'me' : ''}>
              <div>
                <RankNum>{index + 1}</RankNum>
                <img src={friendInfo.imgUrl} alt="프로필" />
                <div>{friendInfo.nickname}</div>
              </div>
              <div>{friendInfo[rankingMenuList[nowSelect]]}</div>
            </FriendRankBox>
          ))}
      </FriendRankData>
    </>
  );
};

export default Ranking;
