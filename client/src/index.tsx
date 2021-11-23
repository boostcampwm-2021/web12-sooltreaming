import React from 'react';
import ReactDOM from 'react-dom';
import App from '@src/App';
import 'dotenv/config';
// Redux 기본 Setting
import { Provider } from 'react-redux';
import { store } from '@src/store/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
