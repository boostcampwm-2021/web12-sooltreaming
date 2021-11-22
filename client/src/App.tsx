import React from 'react';
import GlobalStyle from './GlobalStyle';
import ErrorToast from '@components/custom/ErrorToast';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Lobby from '@pages/Lobby';
import JoinRoom from '@src/pages/JoinRoom';
import Login from '@pages/Login';
import AuthRoute from '@pages/Splash';
import CreateRoom from '@pages/CreateRoom';
import UserInformation from '@pages/UserInformation';

const App: React.FC = () => {
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
            <Route exact path="/myPage/:id" component={UserInformation} />
            <Route path="*" component={() => <Redirect to="/" />} />
          </Switch>
        </AuthRoute>
      </BrowserRouter>
      <ErrorToast />
    </>
  );
};

export default App;
