import React, { useEffect, useState } from 'react';
import { API } from '@src/api';
import UserProfile from '@components/user-information/information/UserProfile';
import UserData from '@components/user-information/information/UserData';
import Loading from '@components/custom/Loading';
import type { NicknameLogType, InformationPropType } from '@ts-types/components/user-information';

const Information: React.FC<InformationPropType> = ({
  id,
  imgUrl,
  nickname,
}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInformation, setUserInformation] = useState<Object>({});
  const [nicknameLog, setNicknameLog] = useState<NicknameLogType>([]);

  useEffect(() => {
    const requestGetUserInformation = async () => {
      const result = await API.call(API.TYPE.GET_USER_INFORMATION, id);
      if (!result) return;
      const { information, nicknameLog } = result;
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
