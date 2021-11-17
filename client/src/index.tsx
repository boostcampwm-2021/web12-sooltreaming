import React from 'react';
import ReactDOM from 'react-dom';
import App from '@src/App';
import 'dotenv/config';
// Redux 기본 Setting
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// Redux / Saga 나의 Setting
import rootReducer from '@src/store';
import rootSaga from '@src/sagas';
import { DEPLOYMENT } from '@constant/envs';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  DEPLOYMENT === 'development'
    ? (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
