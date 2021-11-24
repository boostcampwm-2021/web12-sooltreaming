import React from 'react';
import {
  TopWrapper,
  Profile,
  BottomWrapper,
  ButtonsWrapper,
  Button,
  ProfileImgSlot,
  ProfileData,
  InformationSpan,
} from '@components/user-information/Information.style';
import { HistoryIcon, ChangeNicknameIcon, DeleteFriendIcon } from '@components/icons';

const UNITS = {
  createdAt: (value) => `가입 일자 : ${value}`,
  chatCount: (value) => `총 채팅 횟수 : ${value}번`,
  hookCount: (value) => `갈고리 사용 횟수 : ${value}번`,
  pollCount: (value) => `투표 선정 횟수 : ${value}번`,
  closeupCount: (value) => `클로즈업 횟수 : ${value}번`,
  dieCount: (value) => `단두대 횟수 : ${value}회 (%)`,
  speakCount: (value) => `건배사 횟수 : ${value}회`,
  starterCount: (value) => `게임 주최 횟수 : ${value}번`,
  totalSeconds: (value) => `총 접속 시간 : ${value}초`,
};

type InfoComponentType = {
  nickname: string;
  imgUrl: string;
  toggleHistoryJudgment?: any;
  toggleNicknameJudgment?: any;
  toggleFriendJudgment?: any;
  userInformation: object;
};

const InfoComponent: React.FC<InfoComponentType> = ({
  nickname,
  imgUrl,
  toggleHistoryJudgment,
  toggleNicknameJudgment,
  toggleFriendJudgment,
  userInformation,
}) => {
  console.log(toggleHistoryJudgment);
  console.log(toggleNicknameJudgment);
  console.log(toggleFriendJudgment);

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
              {toggleHistoryJudgment && (
                <Button onClick={toggleHistoryJudgment}>
                  <HistoryIcon />
                </Button>
              )}
              {toggleNicknameJudgment && (
                <Button onClick={toggleNicknameJudgment}>
                  <ChangeNicknameIcon />
                </Button>
              )}
              {toggleFriendJudgment && (
                <Button onClick={toggleFriendJudgment}>
                  <DeleteFriendIcon />
                </Button>
              )}
            </ButtonsWrapper>
          </ProfileData>
        </Profile>
      </TopWrapper>
      <BottomWrapper>
        {Object.entries(userInformation).map(([key, value], index) => {
          return (
            <InformationSpan key={index}>
              <p>{UNITS[key](value)}</p>
            </InformationSpan>
          );
        })}
      </BottomWrapper>
    </>
  );
};

export default InfoComponent;
