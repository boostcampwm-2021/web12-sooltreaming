import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';

const useToggleSpeaker = (elementRef) => {
  const isSpeakerOn = useSelector((state: RootState) => state.device.isSpeakerOn);

  useEffect(() => {
    const element = elementRef.current;
    const isMute = !(isSpeakerOn || false);
    if (!element) return;
    element.muted = isMute;
  }, [isSpeakerOn]);
};

export default useToggleSpeaker;
