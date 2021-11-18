import React from 'react';
import { RootState } from '@src/store';

import { Header } from '@components/user-information/Ranking.style';

const Ranking: React.FC = () => {
  return (
    <>
      <Header>
        <img src="/images/logo.png" alt="메인 술잔" />
      </Header>
    </>
  );
};

export default Ranking;
