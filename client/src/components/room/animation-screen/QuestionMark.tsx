import React, { useEffect, useRef } from 'react';
import { QuestionImg } from '@components/room/animation-screen/QuestionMark.style';
import useUpdateSpeaker from '@hooks/useUpdateSpeaker';
import useToggleSpeaker from '@hooks/useToggleSpeaker';

type QuestionMarkPropTypes = {
  identifier: string;
  disappearSelf: Function;
  x: number;
  y: number;
};

const QUESTION_MARK_TIME = 1900;

const QuestionMark: React.FC<QuestionMarkPropTypes> = ({ identifier, disappearSelf, x, y }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setTimeout(() => {
      disappearSelf(identifier);
    }, QUESTION_MARK_TIME);
  }, []);

  useUpdateSpeaker(audioRef);
  useToggleSpeaker(audioRef);

  return (
    <>
      <QuestionImg x={x} y={y} />
      <audio ref={audioRef} src="/audios/mia-ping.mp3" autoPlay></audio>
    </>
  );
};

export default QuestionMark;
