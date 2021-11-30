import React, { useRef } from 'react';
import { QuestionScreen } from '@components/room/animation-screen/QuestionMark.style';
import useUpdateSpeaker from '@hooks/useUpdateSpeaker';
import useToggleSpeaker from '@hooks/useToggleSpeaker';
import type { QuestionMarkPropType } from '@ts-types/components/room';

const QuestionMark: React.FC<QuestionMarkPropType> = ({ x, y }): React.ReactElement => {
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
