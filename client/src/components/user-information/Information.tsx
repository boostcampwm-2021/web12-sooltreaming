import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { API } from '@src/api';
import NicknameLogModal from '@components/user-information/modals/NicknameLogModal';
import NicknameChangeModal from '@components/user-information/modals/NicknameChangeModal';
import InfoComponent from '@components/user-information/InfoComponent';

export type NicknameLogType = {
  nickname: string;
};

const Information: React.FC = () => {
  const [userInformation, setUserInformation] = useState({});
  const [nicknameLog, setNicknameLog] = useState<Array<NicknameLogType>>([]);
  const [historyIsOpen, setHistoryIsOpen] = useState<boolean>(false);
  const [changeNicknameIsOpen, setChangeNicknameIsOpen] = useState<boolean>(false);
  const { id, imgUrl, nickname } = useSelector((state: RootState) => state.user);

  const toggleHistoryJudgment = useCallback(() => {
    setHistoryIsOpen((prev) => !prev);
  }, []);

  const toggleNicknameJudgment = useCallback(() => {
    setChangeNicknameIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const requestGetUserInformation = async () => {
      const { information, nicknameLog } = await API.call(API.TYPE.GET_USER_INFORMATION, id);
      setUserInformation(information);
      setNicknameLog(nicknameLog);
    };
    requestGetUserInformation();
  }, []);

  useEffect(() => {
    setNicknameLog((prev) => [{ nickname }, ...prev]);
  }, [nickname]);

  return (
    <>
      <InfoComponent
        nickname={nickname}
        imgUrl={imgUrl}
        toggleHistoryJudgment={toggleHistoryJudgment}
        toggleNicknameJudgment={toggleNicknameJudgment}
        userInformation={userInformation}
      ></InfoComponent>

      <NicknameChangeModal
        changeNicknameIsOpen={changeNicknameIsOpen}
        toggleNicknameJudgment={toggleNicknameJudgment}
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
