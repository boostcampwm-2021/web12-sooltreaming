import React, { useEffect, useRef } from 'react';
import { Wrapper, Column, PreviewFace } from './PrevSetting.style';
import { useRecoilState } from 'recoil';
import { videoActiveState, audioActiveState } from '@src/store/device';
import { VideoIcon, MicIcon } from '@components/icons';
import SettingMenu from '@components/setting/SettingMenu';
import Loading from '@components/custom/Loading';

import useSetting from '@src/hooks/useSetting';

type PrevSettingType = {
  stream: MediaStream;
  setStream: any;
};

const PrevSetting: React.FunctionComponent<PrevSettingType> = ({ stream, setStream }) => {
  const {
    videos,
    audios,
    selectedVideo,
    setSelectedVideo,
    selectedAudio,
    setSelectedAudio,
    isLoading,
  } = useSetting(stream);

  const previewFace = useRef<HTMLVideoElement>(null);
  const [isVideoOn, setIsVideoOn] = useRecoilState<boolean>(videoActiveState);
  const [isAudioOn, setIsAudioOn] = useRecoilState<boolean>(audioActiveState);

  useEffect(() => {
    if (!isLoading && previewFace.current) previewFace.current.srcObject = stream;
  }, [isLoading]);

  useEffect(() => {
    if (!previewFace.current || !previewFace.current.srcObject) return;
    (previewFace.current.srcObject as MediaStream)
      .getVideoTracks()
      .forEach((track) => (track.enabled = isVideoOn));
  }, [isVideoOn]);

  useEffect(() => {
    if (!previewFace.current || !previewFace.current.srcObject) return;
    (previewFace.current.srcObject as MediaStream)
      .getAudioTracks()
      .forEach((track) => (track.enabled = isAudioOn));
  }, [isAudioOn]);

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
