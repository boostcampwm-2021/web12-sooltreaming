import React, { useRef } from 'react';
import { Wrapper, Column, PreviewFace } from '@components/setting/PrevSetting.style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import {
  requestVideoInfo,
  requestAudioInfo,
  requestSpeakerInfo,
  setVideoPower,
  setAudioPower,
  setSpeakerPower,
} from '@store/device';
import { VideoIcon, MicIcon, SpeakerIcon } from '@components/icons';
import SettingMenu from '@components/setting/SettingMenu';
import useUpdateSpeaker from '@hooks/useUpdateSpeaker';
import useUpdateStream from '@hooks/useUpdateStream';
import useToggleSpeaker from '@hooks/useToggleSpeaker';

const PrevSetting: React.FC = () => {
  const dispatch = useDispatch();
  const {
    isVideoOn,
    isAudioOn,
    isSpeakerOn,
    videoInfo,
    audioInfo,
    speakerInfo,
    videoDevices,
    audioDevices,
    speakerDevices,
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
        <SettingMenu
          isDeviceOn={isSpeakerOn}
          setIsDeviceOn={() => {
            dispatch(setSpeakerPower({ isSpeakerOn: !isSpeakerOn }));
          }}
          Icon={SpeakerIcon}
          menuList={speakerDevices}
          selected={speakerInfo}
          setSelected={(item) => {
            dispatch(requestSpeakerInfo({ speakerInfo: item, stream }));
          }}
        />
      </Column>
    </Wrapper>
  );
};

export default PrevSetting;
