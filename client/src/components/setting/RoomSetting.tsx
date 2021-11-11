import React, { useState, useEffect, useRef } from 'react';
import { Wrapper, Column } from './RoomSetting.style';
import { useRecoilStateLoadable } from 'recoil';
import { videoState, audioState } from '@src/store/device';
import customRTC from '@utils/customRTC';
import SettingDropdown from '@components/setting/SettingDropdown';

type RoomSettingType = {
  stream: MediaStream;
};

const RoomSetting: React.FunctionComponent<RoomSettingType> = ({ stream }) => {
  const [videos, setVideos] = useState<MediaDeviceInfo[]>([]);
  const [audios, setAudios] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideo, setSelectedVideo] = useRecoilStateLoadable(videoState);
  const [selectedAudio, setSelectedAudio] = useRecoilStateLoadable(audioState);
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

  if (!(selectedVideo.state === 'hasValue' && selectedAudio.state === 'hasValue')) return <></>;

  return (
    <Wrapper>
      {isLoading ? (
        <></>
      ) : (
        <Column>
          <SettingDropdown
            menuList={videos}
            selected={selectedVideo.contents}
            setSelected={setSelectedVideo}
          />
          <SettingDropdown
            menuList={audios}
            selected={selectedAudio.contents}
            setSelected={setSelectedAudio}
          />
        </Column>
      )}
    </Wrapper>
  );
};

export default RoomSetting;
