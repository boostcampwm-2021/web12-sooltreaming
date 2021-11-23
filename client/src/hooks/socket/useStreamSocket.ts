import { useMemo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAudioPower, setVideoPower } from '@store/device';
import { updateDeviceVideo, updateDeviceAudio } from '@store/room';
import { setNoticeMessage } from '@store/notice';
import Socket from '@socket/socket';

const useStreamSocket = () => {
  const dispatch = useDispatch();

  const errorControl = useCallback((message) => {
    dispatch(setNoticeMessage({ errorMessage: message }));
  }, []);

  const updateOtherVideo = useCallback((updateData) => {
    dispatch(updateDeviceVideo(updateData));
  }, []);

  const updateMyVideo = useCallback((updateData) => {
    dispatch(setVideoPower(updateData));
  }, []);

  const updateOtherAudio = useCallback((updateData) => {
    dispatch(updateDeviceAudio(updateData));
  }, []);

  const updateMyAudio = useCallback((updateData) => {
    dispatch(setAudioPower(updateData));
  }, []);

  const socket = useMemo(
    () =>
      Socket.stream({
        errorControl,
        updateOtherVideo,
        updateMyVideo,
        updateOtherAudio,
        updateMyAudio,
      }),
    [],
  );
  useEffect(() => {
    return () => {
      socket.disconnecting();
    };
  }, []);

  return socket;
};

export default useStreamSocket;
