import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import {
  TopWrapper,
  Profile,
  BottomWrapper,
  ButtonsWrapper,
  Button,
  ProfileImgSlot,
  ProfileData,
} from '@components/user-information/Information.style';
import { HistoryIcon, ChangeNicknameIcon, DeleteFriendIcon } from '@components/icons';

const Information: React.FC = () => {
  const { id, imgUrl, nickname } = useSelector((state: RootState) => state.user);
  return (
    <>
      <TopWrapper>
        <Profile>
          <ProfileImgSlot>
            <img src={imgUrl} alt="프로필" />
          </ProfileImgSlot>
          <ProfileData>
            <p>{nickname}</p>
            <ButtonsWrapper>
              <Button>
                <HistoryIcon />
              </Button>
              <Button>
                <ChangeNicknameIcon />
              </Button>
              <Button>
                <DeleteFriendIcon />
              </Button>
            </ButtonsWrapper>
          </ProfileData>
        </Profile>
      </TopWrapper>
      <BottomWrapper>
        {/* DB 관련 정보들이 들어가는 공간 */}
        <p>총 접속 시간 : 11111초</p>
        <p>갈고리 사용 횟수 : 999번 </p>
        <p>총 채팅 횟수 : 999번 </p>
        <p>투표 선정 횟수 : 100번 </p>
        <p>클로즈업 횟수 : 100번 </p>
        <p>단두대 횟수 : 99회 (99%) </p>
        <p>건배사 횟수 : 1회 </p>
        <p>주최자 횟수 : 10번 </p>
        <p>총 접속 시간 : 1111111초 </p>
      </BottomWrapper>
    </>
  );
};

export default Information;
