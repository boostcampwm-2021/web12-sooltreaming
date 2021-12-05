import React, { useState, useEffect, useRef } from 'react';
import { TimerContainer } from '@components/room/scaffold/TimerBomb.style';
import { SECOND_TO_MS, VOTE_TIME } from 'sooltreaming-domain/constant/addition';

const TimerBomb: React.FC = (): React.ReactElement => {
  const [time, setTime] = useState<number>(VOTE_TIME);
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);
  useEffect(() => {
    if (time <= 0) return;
    timeout.current = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, SECOND_TO_MS);
  }, [time]);

  return (
    <TimerContainer>
      <img src="/images/bomb.png" alt="timer" />
      <div>{time.toString()}</div>
    </TimerContainer>
  );
};

export default TimerBomb;
