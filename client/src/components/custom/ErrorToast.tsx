import React, { useState, useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { errorMessageState } from '@src/store/message';

const ErrorToast: React.FC = () => {
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
  const [displayMessage, setDisplayMessage] = useState<string>('');
  const [previousAct, setPreviousAct] = useState<ReturnType<typeof setTimeout> | null>(null);

  const activeMessage = useCallback(() => {
    setPreviousAct(null);
    setDisplayMessage('');
  }, []);

  useEffect(() => {
    if (!errorMessage) return;
    if (previousAct) clearTimeout(previousAct);
    const closeMethod = setTimeout(activeMessage, 1500);
    setPreviousAct(closeMethod);
    setDisplayMessage(errorMessage);
    setErrorMessage('');
  }, [errorMessage]);

  if (!displayMessage) return <></>;
  return (
    <div>
      <span>{displayMessage}</span>
    </div>
  );
};

export default ErrorToast;
