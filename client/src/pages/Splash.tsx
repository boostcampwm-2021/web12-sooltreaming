import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { userLoginRequest } from '@store/user';
import Loading from '@components/custom/Loading';
import ServerError from '@components/custom/ServerError';

const Splash: React.FC<React.ReactNode> = ({ children }): React.ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, isLoadingUser, errorStatus } = useSelector((state: RootState) => state.user);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const hasError = !!errorStatus;
  const isLoggedIn = !!id;

  useEffect(() => {
    const roomRegExp = new RegExp('/room/(?<code>[\\w]+)', 'y');
    const locationTest = roomRegExp.exec(window.location.pathname);
    if (locationTest && locationTest.groups) {
      const code = locationTest.groups.code;
      localStorage.setItem('roomCode', code);
    }
    dispatch(userLoginRequest({}));
  }, []);

  useEffect(() => {
    if (isLoadingUser && isFirst) setIsFirst(false);
    else if (isLoggedIn) {
      const roomCode = localStorage.getItem('roomCode');
      if (!roomCode) return;
      localStorage.removeItem('roomCode');
      history.replace(`/room/${roomCode}`);
    }
  }, [isFirst, isLoadingUser, isLoggedIn]);

  if (hasError) return <ServerError status={errorStatus} />;
  if (isFirst || isLoadingUser) return <Loading />;
  if (!isLoggedIn) return <Redirect to={'/login'} />;
  return <>{children}</>;
};

export default Splash;
