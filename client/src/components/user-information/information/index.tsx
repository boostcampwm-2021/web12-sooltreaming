import React, { useEffect, useState } from 'react';
import { API } from '@src/api';
import UserProfile from '@components/user-information/information/UserProfile';
import UserData from '@components/user-information/information/UserData';
import Loading from '@components/custom/Loading';

export type NicknameLogType = Array<{ nickname: string }>;

type InformationPropTypes = {
  id: string;
  imgUrl: string;
  nickname: string;
};

const Information: React.FC<InformationPropTypes> = ({ id, imgUrl, nickname }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInformation, setUserInformation] = useState({});
  const [nicknameLog, setNicknameLog] = useState<Array<NicknameLogType>>([]);

  useEffect(() => {
    const requestGetUserInformation = async () => {
      const { information, nicknameLog } = await API.call(API.TYPE.GET_USER_INFORMATION, id);
      setUserInformation(information);
      setNicknameLog(nicknameLog);
      setIsLoading(false);
    };
    requestGetUserInformation();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <>
      <UserProfile id={id} imgUrl={imgUrl} nickname={nickname} nicknameLog={nicknameLog} />
      <UserData userInformation={userInformation} />
    </>
  );
};

export default Information;
