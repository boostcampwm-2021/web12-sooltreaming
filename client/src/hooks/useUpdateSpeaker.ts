import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';

const attachSinkId = (element, sinkId) => {
  if (!element) return console.error('No Element Exists');
  if (typeof element.sinkId === 'undefined')
    return console.error('Browser does not support output device selection.');

  element.setSinkId(sinkId).catch((error) => {
    let errorMessage = error;
    if (error.name === 'SecurityError') {
      errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
    }
    console.error(errorMessage);
  });
};

const useUpdateSpeaker = (elementRef) => {
  const speakerInfo = useSelector((state: RootState) => state.device.speakerInfo);

  useEffect(() => {
    const element = elementRef.current;
    const sinkId = speakerInfo?.deviceId || '';
    if (!element) return;
    attachSinkId(element, sinkId);
  }, [speakerInfo]);
};

export default useUpdateSpeaker;
