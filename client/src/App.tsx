import React from 'react';
import GlobalStyle from './GlobalStyle';
import ErrorToast from '@components/custom/ErrorToast';
import { useSetRecoilState } from 'recoil';
import { errorMessageState } from '@src/store/error';

const App: React.FC = () => {
  const setMessage = useSetRecoilState(errorMessageState);

  return (
    <div className="App">
      <GlobalStyle />
      <input
        onKeyPress={(e: any) => {
          const { key, target } = e;
          if (key !== 'Enter') return;
          setMessage(target?.value ?? '');
        }}
      />
      <ErrorToast />
      됐다
    </div>
  );
};

export default App;
