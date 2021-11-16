import React from 'react';
import { Wrapper } from './TimerBomb.style';

const TimerBomb: React.FC = () => {
  return (
    <Wrapper>
      <img src="/images/bomb.png" alt="timer" />
      <div>10</div>
    </Wrapper>
  );
};

export default TimerBomb;
