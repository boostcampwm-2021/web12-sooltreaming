import React from 'react';
import GlobalStyle from './GlobalStyle';
import ErrorToast from '@components/custom/ErrorToast';
import Chat from '@components/chat-room/Chat';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Chat />
      <ErrorToast />
    </>
  );
};

export default App;
