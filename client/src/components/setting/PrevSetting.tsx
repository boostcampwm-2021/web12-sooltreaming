import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Wrapper, Column, PreviewFace } from './PrevSetting.style';
import { useRecoilStateLoadable, useRecoilState } from 'recoil';
import { videoState, audioState, videoActiveState, audioActiveState } from '@src/store/device';
import { VideoIcon, MicIcon } from '@components/icons';
import customRTC from '@utils/customRTC';
import SettingMenu from '@components/setting/SettingMenu';

import Loading from '@components/custom/Loading';

type PrevSettingType = {
  stream: MediaStream;
  setStream: any;
};

const PrevSetting: React.FunctionComponent<PrevSettingType> = ({ stream, setStream }) => {
  const previewFace = useRef<HTMLVideoElement>(null);
  const [videos, setVideos] = useState<MediaDeviceInfo[]>([]);
  const [audios, setAudios] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideo, setSelectedVideo] = useRecoilStateLoadable(videoState);
  const [selectedAudio, setSelectedAudio] = useRecoilStateLoadable(audioState);
  const [isVideoOn, setIsVideoOn] = useRecoilState<boolean>(videoActiveState);
  const [isAudioOn, setIsAudioOn] = useRecoilState<boolean>(audioActiveState);

  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    if (!isLoading && previewFace.current) previewFace.current.srcObject = stream;
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    const updateVideoStream = async () => {
      stream.getVideoTracks().forEach((track) => {
        track.stop();
        stream.removeTrack(track);
      });
      const newVideoTrack = await customRTC.getVideoTrack(selectedVideo.contents.deviceId);
      if (!newVideoTrack) return;
      stream.addTrack(newVideoTrack);
    };
    updateVideoStream();
  }, [selectedVideo]);

  useEffect(() => {
    if (isLoading) return;

    const updateAudioStream = async () => {
      stream.getVideoTracks().forEach((track) => {
        track.stop();
        stream.removeTrack(track);
      });
      const newAudioTrack = await customRTC.getVideoTrack(selectedAudio.contents.deviceId);
      if (!newAudioTrack) return;
      stream.addTrack(newAudioTrack);
    };
    updateAudioStream();
  }, [selectedAudio]);

  useEffect(() => {
    if (!previewFace.current || !previewFace.current.srcObject) return;
    (previewFace.current.srcObject as MediaStream)
      .getVideoTracks()
      .forEach((track) => (track.enabled = isVideoOn));
  }, [isVideoOn]);

  if (!(selectedVideo.state === 'hasValue' && selectedAudio.state === 'hasValue')) return <></>;

  return isLoading ? (
    <Loading />
  ) : (
    <Wrapper>
      <PreviewFace ref={previewFace} width="400" height="400" autoPlay playsInline />
      <Column>
        <SettingMenu
          isDeviceOn={isVideoOn}
          setIsDeviceOn={setIsVideoOn}
          Icon={VideoIcon}
          menuList={videos}
          selected={selectedVideo.contents}
          setSelected={setSelectedVideo}
        />
        <SettingMenu
          isDeviceOn={isAudioOn}
          setIsDeviceOn={setIsAudioOn}
          Icon={MicIcon}
          menuList={audios}
          selected={selectedAudio.contents}
          setSelected={setSelectedAudio}
        />
      </Column>
    </Wrapper>
  );
};

export default PrevSetting;
