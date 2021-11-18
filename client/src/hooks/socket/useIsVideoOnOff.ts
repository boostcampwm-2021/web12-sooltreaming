import { useMemo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setVideoPower } from '@store/device';
import { updateDeviceVideo } from '@store/room';
import { setNoticeMessage } from '@store/notice';
import Socket from '@socket/socket';

const useIsVideoOnOff = () => {
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

  const socket = useMemo(() => Socket.isVideoOnOff({ errorControl, updateOtherVideo, updateMyVideo }), []);
  useEffect(() => {
    return () => {
      socket.disconnecting();
    };
  }, []);

  return socket;
};

export default useIsVideoOnOff;
