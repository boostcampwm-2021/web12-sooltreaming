import React, { useState, useEffect } from 'react';
import { Wrapper } from '@components/room/scaffold/TimerBomb.style';

const SECOND_TO_MS = 1000;
const VOTE_TIME = 60;

const TimerBomb: React.FC = () => {
  const [time, setTime] = useState<number>(VOTE_TIME);

  useEffect(() => {
    if (time <= 0) return;
    setTimeout(() => {
      setTime((prev) => prev - 1);
    }, SECOND_TO_MS);
  }, [time]);

  return (
    <Wrapper>
      <img src="/images/bomb.png" alt="timer" />
      <div>{time.toString()}</div>
    </Wrapper>
  );
};

export default TimerBomb;
