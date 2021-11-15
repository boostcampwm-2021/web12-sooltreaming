import React, { useRef } from 'react';
import { Wrapper, Column, PreviewFace } from './PrevSetting.style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import {
  requestVideoInfo,
  requestAudioInfo,
  setVideoPower,
  setAudioPower,
} from '@store/device';
import { VideoIcon, MicIcon, SpeakerIcon } from '@components/icons';
import SettingMenu from '@components/setting/SettingMenu';

const PrevSetting: React.FC = () => {
  const dispatch = useDispatch();
  const {
    isVideoOn,
    isAudioOn,
    videoInfo,
    audioInfo,
    videoDevices,
    audioDevices,
    stream,
  } = useSelector((state: RootState) => state.device);
  const previewFace = useRef<HTMLVideoElement>(null);

  useUpdateSpeaker(previewFace);
  useToggleSpeaker(previewFace);
  useUpdateStream(previewFace, stream);

  return (
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
            dispatch(requestVideoInfo({ videoInfo: item, stream }));
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
            dispatch(requestAudioInfo({ audioInfo: item, stream }));
          }}
        />
          }}
        />
      </Column>
    </Wrapper>
  );
};

export default PrevSetting;
