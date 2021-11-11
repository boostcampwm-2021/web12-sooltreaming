import { useEffect, useState } from 'react';
import customRTC from '@utils/customRTC';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { requestInitInfo } from '@store/device';

const useSetting = (stream: MediaStream) => {
  const dispatch = useDispatch();
  const { isVideoOn, isAudioOn, videoInfo, audioInfo, videoDevices, audioDevices, isLoading } =
    useSelector((state: RootState) => state.device);

  useEffect(() => {
    dispatch(requestInitInfo({}));
  }, []);

  useEffect(() => {
    const updateVideoStream = async () => {
      if (isLoading) return;
      if (!videoInfo) return;
      stream.getVideoTracks().forEach((track) => {
        track.stop();
        stream.removeTrack(track);
      });
      const newVideoTrack = await customRTC.getVideoTrack(videoInfo.deviceId);
      if (!newVideoTrack) return;
      newVideoTrack.enabled = isVideoOn;
      stream.addTrack(newVideoTrack);
    };
    updateVideoStream();
  }, [videoInfo]);

  useEffect(() => {
    const updateAudioStream = async () => {
      if (isLoading) return;
      if (!audioInfo) return;
      stream.getAudioTracks().forEach((track) => {
        track.stop();
        stream.removeTrack(track);
      });
      const newAudioTrack = await customRTC.getAudioTrack(audioInfo.deviceId);
      if (!newAudioTrack) return;
      newAudioTrack.enabled = isAudioOn;
      stream.addTrack(newAudioTrack);
    };
    updateAudioStream();
  }, [audioInfo]);

  return {
    isVideoOn,
    isAudioOn,
    videoInfo,
    audioInfo,
    videoDevices,
    audioDevices,
    isLoading,
  };
};

export default useSetting;
