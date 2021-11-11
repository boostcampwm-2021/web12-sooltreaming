import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '@store/user';
import Loading from '@components/custom/Loading';
import ServerError from '@components/custom/ServerError';
import { loginWithSession } from '@api/user';

const Splash: React.FC = ({ children }) => {
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [errorStatus, setErrorStatus] = useState('');
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const isLoggedIn = !!userInfo.id;

  useEffect(() => {
    loginWithSession()
      .then((data) => {
        setUserInfo(data);
        setIsFirst(false);
      })
      .catch(({ message }) => {
        if (message === '401') setIsFirst(false);
        else setErrorStatus(message);
      });
  }, []);

  if (!!errorStatus) return <ServerError status={errorStatus} />;
  if (isFirst) return <Loading />;
  if (!isLoggedIn) return <Redirect to="/login" />;
  return <>{children}</>;
};

export default Splash;
