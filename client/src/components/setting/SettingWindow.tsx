import React, { useState, useEffect } from 'react';
import { Wrapper, Column, VideoBox } from './SettingWindow.style.js';
import { useRecoilStateLoadable, useRecoilState } from 'recoil';
import { videoState, audioState, videoActiveState, audioActiveState } from '@src/store/device';
import SettingMenu from './SettingMenu';
import { VideoIcon, MicIcon } from '@components/icons';
import customRTC from '@utils/customRTC';

const SettingModal: React.FunctionComponent = () => {
  const [videos, setVideos] = useState<MediaDeviceInfo[]>([]);
  const [audios, setAudios] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideo, setSelectedVideo] = useRecoilStateLoadable(videoState);
  const [selectedAudio, setSelectedAudio] = useRecoilStateLoadable(audioState);
  const [isVideoOn, setIsVideoOn] = useRecoilState<boolean>(videoActiveState);
  const [isAudioOn, setIsAudioOn] = useRecoilState<boolean>(audioActiveState);

  useEffect(() => {
    const initDevice = async () => {
      const videoDevices = await customRTC.getVideos();
      const audioDevices = await customRTC.getAudios();
      setVideos(videoDevices);
      setAudios(audioDevices);
    };
    initDevice();
  }, []);

  if (!(selectedVideo.state === 'hasValue' && selectedAudio.state === 'hasValue')) return <></>;

  return (
    <Wrapper>
      <VideoBox />
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
