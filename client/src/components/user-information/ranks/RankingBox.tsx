import React from 'react';
import {
  RankData,
  PersonalRankBox,
  RankNum,
  RankTitle,
  Container,
} from '@components/user-information/ranks/RankingBox.style';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import type { RankingBoxPropType } from '@ts-types/components/user-information';

const RankingBox: React.FC<RankingBoxPropType> = ({
  title,
  rank,
  nowSelect,
  filterList,
}): React.ReactElement => {
  const myId = useSelector((state: RootState) => state.user.id);
  const rankList =
    filterList.length === rank.length
      ? rank
      : rank.filter(({ _id }) => [...filterList, myId].includes(_id));

  return (
    <Container>
      <RankTitle>{title}</RankTitle>
      <RankData>
        {Object.values(rankList).map((userInfo: any, index) => (
          <PersonalRankBox key={userInfo._id} className={userInfo._id === myId ? 'me' : ''}>
            <div>
              <RankNum>{index + 1}</RankNum>
              <img src={userInfo.imgUrl} alt="프로필" />
              <div>{userInfo.nickname}</div>
            </div>
            <div>{userInfo[nowSelect]}</div>
          </PersonalRankBox>
        ))}
      </RankData>
    </Container>
  );
};

export default RankingBox;
