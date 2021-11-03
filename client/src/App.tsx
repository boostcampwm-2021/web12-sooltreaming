import React from 'react';
import GlobalStyle from './GlobalStyle';
import ErrorToast from '@components/custom/ErrorToast';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Lobby from '@pages/Lobby';
import ChatRoom from '@pages/ChatRoom';
import Chat from '@components/chat-room/Chat';
import { useSetRecoilState } from 'recoil';
import { errorMessageState } from '@src/store/error';

const App: React.FC = () => {
  const setMessage = useSetRecoilState(errorMessageState);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path="/lobby" component={Lobby} />
          <Route exact path="/chatRoom/:code" component={ChatRoom} />
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
      <input
        onKeyPress={(e: any) => {
          const { key, target } = e;
          if (key !== 'Enter') return;
          setMessage(target?.value ?? '');
        }}
      />
      <Chat />
      <ErrorToast />
    </>
  );
};

export default App;
