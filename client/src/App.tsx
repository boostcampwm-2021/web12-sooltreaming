import React, { lazy, Suspense } from 'react';
import GlobalStyle from '@src/GlobalStyle';
import ErrorToast from '@components/custom/ErrorToast';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Loading from '@components/custom/Loading';
const Lobby = lazy(() => import('@pages/Lobby'));
const JoinRoom = lazy(() => import('@pages/JoinRoom'));
const Login = lazy(() => import('@pages/Login'));
const AuthRoute = lazy(() => import('@pages/Splash'));
const CreateRoom = lazy(() => import('@pages/CreateRoom'));
const UserPage = lazy(() => import('@pages/UserPage'));

const App: React.FC = (): React.ReactElement => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </BrowserRouter>
      <ErrorToast />
    </>
  );
};

export default App;
