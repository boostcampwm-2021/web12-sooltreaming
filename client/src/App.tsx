import React from 'react';
import GlobalStyle from './GlobalStyle';
import ErrorToast from '@components/custom/ErrorToast';
import Header from '@components/Header';
import Lobby from '@pages/Lobby';
import { useSetRecoilState } from 'recoil';
import { errorMessageState } from '@src/store/error';

const App: React.FC = () => {
  const setMessage = useSetRecoilState(errorMessageState);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Lobby />
      <ErrorToast />
    </>
  );
};

export default App;
