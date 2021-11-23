import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { API } from '@src/api';
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
import NicknameLogModal from '@components/user-information/modals/NicknameLogModal';
import NicknameChangeModal from '@components/user-information/modals/NicknameChangeModal';
import DeleteFriendModal from '@components/user-information/modals/DeleteFriendModal';

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

export type NicknameLogType = {
  nickname: string;
};

const Information: React.FC = () => {
  const [userInformation, setUserInformation] = useState({});
  const [nicknameLog, setNicknameLog] = useState<Array<NicknameLogType>>([]);
  const [historyIsOpen, setHistoryIsOpen] = useState<boolean>(false);
  const [changeNicknameIsOpen, setChangeNicknameIsOpen] = useState<boolean>(false);
  const [deleteFriendIsOpen, setDeleteFriendIsOpen] = useState<boolean>(false);
  const { id, imgUrl, nickname } = useSelector((state: RootState) => state.user);

  const toggleHistoryJudgment = useCallback(() => {
    setHistoryIsOpen((prev) => !prev);
  }, []);

  const toggleFriendJudgment = useCallback(() => {
    setDeleteFriendIsOpen((prev) => !prev);
  }, []);

  const toggleNicknameJudgment = useCallback(() => {
    setChangeNicknameIsOpen((prev) => !prev);
  }, []);

  const changeProfileImage = useCallback(() => {}, []);

  useEffect(() => {
    const requestGetUserInformation = async () => {
      const user = await API.call(API.TYPE.GET_USER_INFORMATION, id);
      setUserInformation(user);
      setNicknameLog(user.nicknameLog);
    };
    requestGetUserInformation();
  }, []);

  useEffect(() => {
    setNicknameLog((prev) => [{ nickname }, ...prev]);
  }, [nickname]);

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
              <Button onClick={toggleHistoryJudgment}>
                <HistoryIcon />
              </Button>
              <Button onClick={toggleNicknameJudgment}>
                <ChangeNicknameIcon />
              </Button>
              <Button onClick={toggleFriendJudgment}>
                <DeleteFriendIcon />
              </Button>
            </ButtonsWrapper>
          </ProfileData>
        </Profile>
      </TopWrapper>
      <BottomWrapper>
        {Object.entries(userInformation).map(([key, value], index) => {
          if (key === '_id' || key === 'nicknameLog') return <></>;
          return (
            <InformationSpan>
              <p>{UNITS[key](value)}</p>
            </InformationSpan>
          );
        })}
      </BottomWrapper>

      <NicknameChangeModal
        changeNicknameIsOpen={changeNicknameIsOpen}
        toggleNicknameJudgment={toggleNicknameJudgment}
      />
      <DeleteFriendModal
        deleteFriendIsOpen={deleteFriendIsOpen}
        toggleFriendJudgment={toggleFriendJudgment}
      />
      <NicknameLogModal
        historyIsOpen={historyIsOpen}
        nickname={nickname}
        nicknameLog={nicknameLog}
        toggleHistoryJudgment={toggleHistoryJudgment}
      />
    </>
  );
};

export default Information;
