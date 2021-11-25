import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setNoticeMessage } from '@store/notice';
import { TOAST_TIME } from 'sooltreaming-domain/constant/addition';

const ErrorToast: React.FC = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state: RootState) => state.notice.errorMessage);
  const [displayMessage, setDisplayMessage] = useState<string>('');
  const [previousAct, setPreviousAct] = useState<ReturnType<typeof setTimeout> | null>(null);

  const activeMessage = useCallback(() => {
    setPreviousAct(null);
    setDisplayMessage('');
  }, []);

  useEffect(() => {
    if (!errorMessage) return;
    if (previousAct) clearTimeout(previousAct);
    const closeMethod = setTimeout(activeMessage, TOAST_TIME);
    setPreviousAct(closeMethod);
    setDisplayMessage(errorMessage);
    dispatch(setNoticeMessage({ errorMessage: '' }));
  }, [errorMessage]);

  if (!displayMessage) return <></>;
  return (
    <div>
      <span>{displayMessage}</span>
    </div>
  );
};

export default ErrorToast;
