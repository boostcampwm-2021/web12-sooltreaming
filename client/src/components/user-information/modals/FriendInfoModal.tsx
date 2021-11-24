import React, { useState, useEffect } from 'react';
import Modal from '@components/custom/Modal';

import { API } from '@api/index';

import { RequestData, Xbutton } from '@components/user-information/FriendList.style';

import NicknameLogModal from '@components/user-information/modals/NicknameLogModal';
import DeleteFriendModal from '@components/user-information/modals/DeleteFriendModal';
import type { NicknameLogType } from '@components/user-information/Information';

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

import { HistoryIcon, DeleteFriendIcon } from '@components/icons';

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

const FriendInfoModal = ({ friend, friendInfoIsOpen, closeFriendInfoJudgment, setFriendList }) => {
  const [friendInformation, setFriendInfo] = useState<Object>({});
  const [friendNicknameLog, setFriendNicknameInfo] = useState<Array<NicknameLogType>>([]);

  const [deleteFriendIsOpen, setDeleteFriendIsOpen] = useState<boolean>(false);
  const [historyIsOpen, setHistoryIsOpen] = useState<boolean>(false);

  const { nickname, imgUrl, id } = friend;

  const toggleHistoryJudgment = () => {
    setHistoryIsOpen((prev) => !prev);
  };

  const toggleFriendJudgment = () => {
    setDeleteFriendIsOpen((prev) => !prev);
  };

  const deleteFriend = async () => {
    await API.call(API.TYPE.DELETE_FRIEND, id);
    setFriendList(id);
    closeFriendInfoJudgment();
  };

  useEffect(() => {
    if (!id) return;
    const httpRequest = async () => {
      const { information, nicknameLog } = await API.call(API.TYPE.GET_USER_INFORMATION, id);
      setFriendInfo(information);
      setFriendNicknameInfo(nicknameLog);
    };
    httpRequest();
  }, [friend]);

  return (
    <div>
      <Modal
        isOpen={friendInfoIsOpen}
        isRelative={false}
        renderCenter={true}
        absolutePos={{ top: '50%', left: '50%' }}
      >
        <div>
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
                  <Button onClick={toggleFriendJudgment}>
                    <DeleteFriendIcon />
                  </Button>
                </ButtonsWrapper>
              </ProfileData>
            </Profile>
          </TopWrapper>
          <BottomWrapper>
            {Object.entries(friendInformation).map(([key, value], index) => {
              return (
                <InformationSpan key={index}>
                  <p>{UNITS[key](value)}</p>
                </InformationSpan>
              );
            })}
          </BottomWrapper>
        </div>
        <Xbutton onClick={closeFriendInfoJudgment}>
          <img className="xButton" src="/images/xbutton.png" alt="종료버튼" />
        </Xbutton>
      </Modal>

      <DeleteFriendModal
        nickname={nickname}
        deleteFriend={deleteFriend}
        deleteFriendIsOpen={deleteFriendIsOpen}
        toggleFriendJudgment={toggleFriendJudgment}
      />
      <NicknameLogModal
        historyIsOpen={historyIsOpen}
        nickname={nickname}
        nicknameLog={friendNicknameLog}
        toggleHistoryJudgment={toggleHistoryJudgment}
      />
    </div>
  );
};

export default FriendInfoModal;
