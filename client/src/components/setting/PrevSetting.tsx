import React, { useEffect, useRef } from 'react';
import { Wrapper, Column, PreviewFace } from './PrevSetting.style';
import { useDispatch } from 'react-redux';
import { setVideoInfo, setAudioInfo, setVideoPower, setAudioPower } from '@store/device';
import { VideoIcon, MicIcon } from '@components/icons';
import SettingMenu from '@components/setting/SettingMenu';
import Loading from '@components/custom/Loading';

import useSetting from '@src/hooks/useSetting';

type PrevSettingType = {
  stream: MediaStream;
  setStream: any;
};

const PrevSetting: React.FunctionComponent<PrevSettingType> = ({ stream }) => {
  const { isVideoOn, isAudioOn, videoInfo, audioInfo, videoDevices, audioDevices, isLoading } =
    useSetting(stream);

  const dispatch = useDispatch();
  const previewFace = useRef<HTMLVideoElement>(null);

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

  return isLoading ? (
    <Loading />
  ) : (
    <Wrapper>
      <PreviewFace ref={previewFace} width="400" height="400" autoPlay playsInline />
      <Column>
        <SettingMenu
          isDeviceOn={isVideoOn}
          setIsDeviceOn={() => {
            dispatch(setVideoPower({ isVideoOn: !isVideoOn }));
          }}
          Icon={VideoIcon}
          menuList={videoDevices}
          selected={videoInfo}
          setSelected={(item) => {
            dispatch(setVideoInfo({ videoInfo: item }));
          }}
        />
        <SettingMenu
          isDeviceOn={isAudioOn}
          setIsDeviceOn={() => {
            dispatch(setAudioPower({ isAudioOn: !isAudioOn }));
          }}
          Icon={MicIcon}
          menuList={audioDevices}
          selected={audioInfo}
          setSelected={(item) => {
            dispatch(setAudioInfo({ audioInfo: item }));
          }}
        />
      </Column>
    </Wrapper>
  );
};

export default PrevSetting;
