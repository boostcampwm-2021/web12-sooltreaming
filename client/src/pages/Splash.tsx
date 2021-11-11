import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { userLoginRequest } from '@store/user';
import Loading from '@components/custom/Loading';
import ServerError from '@components/custom/ServerError';

const Splash: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { id, isLoadingUser, errorStatus } = useSelector((state: RootState) => state.user);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const hasError = !!errorStatus;
  const isLoggedIn = !!id;

  useEffect(() => {
    dispatch(userLoginRequest({}));
  }, []);

  useEffect(() => {
    if (isLoadingUser) setIsFirst(false);
  }, [isLoadingUser]);

  if (hasError) return <ServerError status={errorStatus} />;
  if (isFirst || isLoadingUser) return <Loading />;
  if (!isLoggedIn) return <Redirect to="/login" />;
  return <>{children}</>;
};

export default Splash;
