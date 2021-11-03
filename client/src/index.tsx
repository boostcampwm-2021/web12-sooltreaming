import React from 'react';
import ReactDOM from 'react-dom';
import App from '@src/App';
import { RecoilRoot } from 'recoil';
import 'dotenv/config';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
