import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNoticeMessage } from '@store/notice';
import { setNickname } from '@store/user';
import { RootState } from '@src/store';
import { patchUserNickname } from '@api/user';
import {
  TopWrapper,
  Profile,
  BottomWrapper,
  ButtonsWrapper,
  Button,
  ProfileImgSlot,
  ProfileData,
  InformationSpan,
  Header,
  DeleteChangePressSection,
  CheckPressSection,
  HistoryData,
  ChangeNicknameData,
  NewNicknameInput,
} from '@components/user-information/Information.style';
import { HistoryIcon, ChangeNicknameIcon, DeleteFriendIcon } from '@components/icons';
import Modal from '@components/custom/Modal';
import request from '@utils/request';

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

const Information: React.FC = () => {
  const dispatch = useDispatch();
  const [userInformation, setUserInformation] = useState({});
  const [nicknameLog, setNicknameLog] = useState([]);
  const [historyIsOpen, setHistoryIsOpen] = useState<boolean>(false);
  const [changeNicknameIsOpen, setChangeNicknameIsOpen] = useState<boolean>(false);
  const [deleteFriendIsOpen, setDeleteFriendIsOpen] = useState<boolean>(false);
  const { id, imgUrl, nickname } = useSelector((state: RootState) => state.user);
  const newNicknameData = useRef<HTMLInputElement>(null);

  const openHistoryJudgment = () => {
    const getNicknameLog = async () => {
      const { json, status } = await request.get({ url: '/user/nickname', query: { id } });
      if (status >= 400) {
        dispatch(setNoticeMessage({ errorMessage: json.message }));
      }
      setNicknameLog(json.nicknameLog);
      setHistoryIsOpen(true);
    };
    getNicknameLog();
  };

  const closeHistoryJudgment = () => {
    setHistoryIsOpen(false);
  };

  const openNicknameJudgment = () => {
    setChangeNicknameIsOpen(true);
  };

  const closeNicknameJudgment = () => {
    setChangeNicknameIsOpen(false);
  };

  const openDeleteFriendJudgment = () => {
    setDeleteFriendIsOpen(true);
  };

  const closeDeleteFriendJudgment = () => {
    setDeleteFriendIsOpen(false);
  };

  // 닉네임 변경 함수
  const changeNickname = () => {
    const newNickname = newNicknameData.current?.value;
    if (newNickname === nickname || !newNickname) return;

    const requestChangeUserNickname = async () => {
      const result = await patchUserNickname(newNickname);
      if (!result) dispatch(setNoticeMessage({ errorMessage: '닉네임 변경에 실패하였습니다.' }));
      else dispatch(setNickname(newNickname));

      closeNicknameJudgment();
    };
    requestChangeUserNickname();
  };

  useEffect(() => {
    const httpRequest = async () => {
      const { json, status } = await request.get({ url: '/user', query: { id } });
      if (status > 400) {
        dispatch(setNoticeMessage({ errorMessage: json.message }));
      }
      setUserInformation(json.user);
    };
    httpRequest();
  }, []);

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
              <Button onClick={openHistoryJudgment}>
                <HistoryIcon />
              </Button>
              <Button onClick={openNicknameJudgment}>
                <ChangeNicknameIcon />
              </Button>
              <Button onClick={openDeleteFriendJudgment}>
                <DeleteFriendIcon />
              </Button>
            </ButtonsWrapper>
          </ProfileData>
        </Profile>
      </TopWrapper>
      <BottomWrapper>
        {Object.entries(userInformation).map(([key, value], index) => {
          if (key === '_id') return <></>;
          return <InformationSpan>{UNITS[key](value)}</InformationSpan>;
        })}
      </BottomWrapper>

      <Modal
        isOpen={historyIsOpen}
        isRelative={false}
        renderCenter={true}
        absolutePos={{ top: '50%', left: '50%' }}
      >
        <Header>
          <h2>
            <span>{nickname}</span> 님의 닉네임 변경 내역
          </h2>
        </Header>
        <HistoryData>
          {nicknameLog.map(({ nickname: prevNickname }, index) => (
            <p>{prevNickname}</p>
          ))}
        </HistoryData>
        <CheckPressSection>
          <button onClick={closeHistoryJudgment}>
            <img src="/images/check.png" alt="check" />
          </button>
        </CheckPressSection>
      </Modal>

      <Modal
        isOpen={changeNicknameIsOpen}
        isRelative={false}
        renderCenter={true}
        absolutePos={{ top: '50%', left: '50%' }}
      >
        <Header>
          <h2>닉네임 변경하기</h2>
        </Header>
        <ChangeNicknameData>
          <NewNicknameInput ref={newNicknameData} placeholder={'변경할 닉네임을 입력해주세요.'} />
        </ChangeNicknameData>
        <DeleteChangePressSection>
          <button onClick={changeNickname}>
            <img src="/images/check.png" alt="check" />
          </button>
          <button onClick={closeNicknameJudgment}>
            <img src="/images/deny.png" alt="deny" />
          </button>
        </DeleteChangePressSection>
      </Modal>

      <Modal
        isOpen={deleteFriendIsOpen}
        isRelative={false}
        renderCenter={true}
        absolutePos={{ top: '50%', left: '50%' }}
      >
        <Header>
          <h2>
            <span>{nickname}</span> 님을 친구 목록에서 삭제하시겠습니까?
          </h2>
        </Header>
        <DeleteChangePressSection>
          <button onClick={closeDeleteFriendJudgment}>
            <img src="/images/agree.png" alt="agree" />
          </button>
          <button onClick={closeDeleteFriendJudgment}>
            <img src="/images/disagree.png" alt="disagree" />
          </button>
        </DeleteChangePressSection>
      </Modal>
    </>
  );
};

export default Information;
