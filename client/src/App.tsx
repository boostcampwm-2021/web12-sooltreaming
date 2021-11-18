import React from 'react';
import GlobalStyle from './GlobalStyle';
import ErrorToast from '@components/custom/ErrorToast';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Lobby from '@pages/Lobby';
import Setting from '@pages/Setting';
import Login from '@pages/Login';
import AuthRoute from '@pages/Splash';
import CreateRoom from '@pages/CreateRoom';
import UserInformation from '@pages/UserInformation';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <AuthRoute>
            <Route exact path="/" component={Lobby} />
            <Route exact path="/create" component={CreateRoom} />
            <Route exact path="/chatRoom/:code" component={Setting} />
            <Route exact path="/myPage/:id" component={UserInformation} />
            <Route component={() => <Redirect to="/" />} />
          </AuthRoute>
          <Route component={() => <Redirect to="/login" />} />
        </Switch>
      </BrowserRouter>
      <ErrorToast />
    </>
  );
};

export default App;
