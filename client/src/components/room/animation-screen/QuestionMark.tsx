import React, { useRef } from 'react';
import { QuestionScreen } from '@components/room/animation-screen/QuestionMark.style';
import useUpdateSpeaker from '@hooks/useUpdateSpeaker';
import useToggleSpeaker from '@hooks/useToggleSpeaker';

type QuestionMarkPropTypes = {
  x: number;
  y: number;
};

const QuestionMark: React.FC<QuestionMarkPropTypes> = ({ x, y }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useUpdateSpeaker(audioRef);
  useToggleSpeaker(audioRef);

  return (
    <>
      <QuestionScreen x={x} y={y} />
      <audio ref={audioRef} src="/audios/mia-ping.mp3" autoPlay></audio>
    </>
  );
};

export default React.memo(QuestionMark);
