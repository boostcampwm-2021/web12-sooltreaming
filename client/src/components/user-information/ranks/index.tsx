import React, { useEffect, useState } from 'react';
import Dropdown from '@components/custom/Dropdown';
import { RankContainer, HeaderContainer } from '@components/user-information/ranks/index.style';
import { DownIcon } from '@components/icons';
import { MenuButton, MenuItem } from '@components/setting/SettingDropdown.style';
import { API } from '@api/index';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import RankingBox from '@components/user-information/ranks/RankingBox';
import Loading from '@components/custom/Loading';

const rankingMenuList = {
  '총 접속 시간': 'totalSeconds',
  '갈고리 사용 횟수': 'hookCount',
  '총 채팅 횟수': 'chatCount',
  '투표 선정 횟수': 'pollCount',
  '클로즈업 횟수': 'closeupCount',
  '단두대 횟수': 'dieCount',
  '주최자 횟수': 'starterCount',
};

const Ranks: React.FC = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const friendList = useSelector((state: RootState) => state.friend.friendList);
  const friendListId = Object.values(friendList).map(({ _id }) => _id);

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
      setIsLoading(false);
    };
    getRank();
  }, [nowSelect]);

  if (isLoading) return <Loading />;
  return (
    <>
      <HeaderContainer>
        <img src="/images/logo.png" alt="메인 술잔" />
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
      </HeaderContainer>
      <RankContainer>
        <RankingBox
          title={'전체'}
          rank={rank}
          nowSelect={rankingMenuList[nowSelect]}
          filterList={rank}
        />
        <RankingBox
          title={'친구'}
          rank={rank}
          nowSelect={rankingMenuList[nowSelect]}
          filterList={friendListId}
        />
      </RankContainer>
    </>
  );
};

export default Ranks;
