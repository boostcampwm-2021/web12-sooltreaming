import React from 'react';
import { RankData, PersonalRankBox, RankNum } from '@components/user-information/RankingBox.style';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
type RankingBoxPropTypes = {
  rank: any[];
  nowSelect: string;
  filterList: string[];
};

const RankingBox: React.FC<RankingBoxPropTypes> = ({ rank, nowSelect, filterList }) => {
  const myId = useSelector((state: RootState) => state.user.id);
  const rankList =
    filterList.length === rank.length
      ? rank
      : rank.filter(({ _id }) => [...filterList, myId].includes(_id));

  return (
    <RankData>
      {Object.values(rankList).map((friendInfo: any, index) => (
        <PersonalRankBox key={friendInfo._id} className={friendInfo._id === myId ? 'me' : ''}>
          <div>
            <RankNum>{index + 1}</RankNum>
            <img src={friendInfo.imgUrl} alt="프로필" />
            <div>{friendInfo.nickname}</div>
          </div>
          <div>{friendInfo[nowSelect]}</div>
        </PersonalRankBox>
      ))}
    </RankData>
  );
};

export default RankingBox;
