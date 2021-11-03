import React from 'react';
import GlobalStyle from './GlobalStyle';
import ErrorToast from '@components/custom/ErrorToast';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Lobby from '@pages/Lobby';
import ChatRoom from '@pages/ChatRoom';
import Chat from '@components/chat-room/Chat';
import { useSetRecoilState } from 'recoil';
import { errorMessageState } from '@src/store/message';

const App: React.FC = () => {
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
      <ErrorToast />
    </>
  );
};

export default App;
