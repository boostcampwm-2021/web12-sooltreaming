import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { setVideoPower, setAudioPower, setSpeakerPower } from '@store/device';
import SettingToggle from '@components/setting/SettingToggle';
import { VideoIcon, MicIcon, SpeakerIcon } from '@components/icons';

const DeviceToggles: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const isVideoOn = useSelector((state: RootState) => state.device.isVideoOn);
  const isAudioOn = useSelector((state: RootState) => state.device.isAudioOn);
  const isSpeakerOn = useSelector((state: RootState) => state.device.isSpeakerOn);

  const toggleVideoPower = () => {
    dispatch(setVideoPower({ isVideoOn: !isVideoOn }));
  };
  const toggleAudioPower = () => {
    dispatch(setAudioPower({ isAudioOn: !isAudioOn }));
  };
  const toggleSpeakerPower = () => {
    dispatch(setSpeakerPower({ isSpeakerOn: !isSpeakerOn }));
  };

  return (
    <>
      <SettingToggle Icon={VideoIcon} isDeviceOn={isVideoOn} setIsDeviceOn={toggleVideoPower} />
      <SettingToggle Icon={MicIcon} isDeviceOn={isAudioOn} setIsDeviceOn={toggleAudioPower} />
      <SettingToggle
        Icon={SpeakerIcon}
        isDeviceOn={isSpeakerOn}
        setIsDeviceOn={toggleSpeakerPower}
      />
    </>
  );
};

export default DeviceToggles;
