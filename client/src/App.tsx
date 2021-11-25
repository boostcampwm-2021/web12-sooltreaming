import React, { useEffect } from 'react';
import GlobalStyle from '@src/GlobalStyle';
import ErrorToast from '@components/custom/ErrorToast';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Lobby from '@pages/Lobby';
import JoinRoom from '@pages/JoinRoom';
import Login from '@pages/Login';
import AuthRoute from '@pages/Splash';
import CreateRoom from '@pages/CreateRoom';
import UserPage from '@pages/UserPage';
import { API } from './api';

const App: React.FC = () => {
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      API.call(API.TYPE.PATCH_TOTAL_SECONDS, new Date().getTime());
    });
  }, []);
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Route exact path="/login" component={Login} />
        <AuthRoute>
          <Switch>
            <Route exact path="/" component={Lobby} />
            <Route exact path="/create" component={CreateRoom} />
            <Route exact path="/room/:code" component={JoinRoom} />
            <Route exact path="/myPage/:id" component={UserPage} />
            <Route path="*" component={() => <Redirect to="/" />} />
          </Switch>
        </AuthRoute>
      </BrowserRouter>
      <ErrorToast />
    </>
  );
};

export default App;
