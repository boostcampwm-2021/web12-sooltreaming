import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Wrapper, Column, VideoBox } from './SettingWindow.style.js';
import { useRecoilStateLoadable, useRecoilState } from 'recoil';
import { videoState, audioState, videoActiveState, audioActiveState } from '@src/store/device';
import SettingMenu from './SettingMenu';
import { VideoIcon, MicIcon } from '@components/icons';
import customRTC from '@utils/customRTC';

type settingModalType = {
  stream: MediaStream;
};

const SettingModal: React.FunctionComponent<settingModalType> = ({ stream }) => {
  const previewFace = useRef<HTMLVideoElement>(null);
  const [videos, setVideos] = useState<MediaDeviceInfo[]>([]);
  const [audios, setAudios] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideo, setSelectedVideo] = useRecoilStateLoadable(videoState);
  const [selectedAudio, setSelectedAudio] = useRecoilStateLoadable(audioState);
  const [isVideoOn, setIsVideoOn] = useRecoilState<boolean>(videoActiveState);
  const [isAudioOn, setIsAudioOn] = useRecoilState<boolean>(audioActiveState);

  useEffect(() => {
    const settingMedia = async () => {
      if (previewFace.current) previewFace.current.srcObject = stream;
      const videoDevices = await customRTC.getVideos();
      const audioDevices = await customRTC.getAudios();
      setVideos(videoDevices);
      setAudios(audioDevices);
    };
    settingMedia();
  }, [stream]);

  useEffect(() => {
    if (!previewFace.current || !previewFace.current.srcObject) return;
    (previewFace.current.srcObject as MediaStream)
      .getVideoTracks()
      .forEach((track) => (track.enabled = isVideoOn));
  }, [isVideoOn]);

  if (!(selectedVideo.state === 'hasValue' && selectedAudio.state === 'hasValue')) return <></>;

  return (
    <Wrapper>
      <VideoBox ref={previewFace} width="400" height="400" autoPlay playsInline />
      <Column>
        <SettingMenu
          menuList={videos}
          selected={selectedVideo.contents}
          setSelected={setSelectedVideo}
          isDeviceOn={isVideoOn}
          setIsDeviceOn={setIsVideoOn}
          Icon={VideoIcon}
        />
        <SettingMenu
          menuList={audios}
          selected={selectedAudio.contents}
          setSelected={setSelectedAudio}
          isDeviceOn={isAudioOn}
          setIsDeviceOn={setIsAudioOn}
          Icon={MicIcon}
        />
      </Column>
    </Wrapper>
  );
};

export default SettingModal;
