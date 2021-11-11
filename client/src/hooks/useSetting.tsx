import { useEffect, useState } from 'react';
import customRTC from '@utils/customRTC';
import { useRecoilStateLoadable, useRecoilState } from 'recoil';
import { videoState, audioState } from '@src/store/device';
import { videoActiveState, audioActiveState } from '@src/store/device';

const useSetting = (stream: MediaStream) => {
  const [videos, setVideos] = useState<MediaDeviceInfo[]>([]);
  const [audios, setAudios] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideo, setSelectedVideo] = useRecoilStateLoadable(videoState);
  const [selectedAudio, setSelectedAudio] = useRecoilStateLoadable(audioState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVideoOn, setIsVideoOn] = useRecoilState<boolean>(videoActiveState);
  const [isAudioOn, setIsAudioOn] = useRecoilState<boolean>(audioActiveState);

  useEffect(() => {
    const settingMedia = async () => {
      const videoDevices = await customRTC.getVideos();
      const audioDevices = await customRTC.getAudios();
      setIsLoading(false);
      setVideos(videoDevices);
      setAudios(audioDevices);
    };
    settingMedia();
  }, []);

  useEffect(() => {
    const updateVideoStream = async () => {
      if (isLoading) return;
      stream.getVideoTracks().forEach((track) => {
        track.stop();
        stream.removeTrack(track);
      });
      const newVideoTrack = await customRTC.getVideoTrack(selectedVideo.contents.deviceId);
      if (!newVideoTrack) return;
      newVideoTrack.enabled = isVideoOn;
      stream.addTrack(newVideoTrack);
    };
    updateVideoStream();
  }, [selectedVideo]);

  useEffect(() => {
    const updateAudioStream = async () => {
      if (isLoading) return;
      stream.getAudioTracks().forEach((track) => {
        track.stop();
        stream.removeTrack(track);
      });
      const newAudioTrack = await customRTC.getAudioTrack(selectedAudio.contents.deviceId);
      if (!newAudioTrack) return;
      newAudioTrack.enabled = isAudioOn;
      stream.addTrack(newAudioTrack);
    };
    updateAudioStream();
  }, [selectedAudio]);

  return {
    videos,
    audios,
    selectedVideo,
    setSelectedVideo,
    selectedAudio,
    setSelectedAudio,
    isLoading,
    setIsLoading,
    isVideoOn,
    isAudioOn,
    setIsVideoOn,
    setIsAudioOn,
  };
};

export default useSetting;
