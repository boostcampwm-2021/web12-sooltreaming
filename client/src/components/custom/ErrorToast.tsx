import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setNoticeMessage } from '@store/notice';
import { ErrorToastBox } from '@components/custom/ErrorToast.style';
import { TOAST_TIME } from 'sooltreaming-domain/constant/addition';

const ErrorToast: React.FC = (): React.ReactElement => {
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
    <ErrorToastBox>
      <span>{displayMessage}</span>
    </ErrorToastBox>
  );
};

export default ErrorToast;
