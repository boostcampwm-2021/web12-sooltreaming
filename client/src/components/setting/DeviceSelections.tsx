import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { requestVideoInfo, requestAudioInfo, requestSpeakerInfo } from '@store/device';
import SettingDropdown from '@components/setting/SettingDropdown';

const DeviceSelections: React.FC = (): React.ReactElement => {
  const videoInfo = useSelector((state: RootState) => state.device.videoInfo);
  const audioInfo = useSelector((state: RootState) => state.device.audioInfo);
  const speakerInfo = useSelector((state: RootState) => state.device.speakerInfo);
  const videoDevices = useSelector((state: RootState) => state.device.videoDevices);
  const audioDevices = useSelector((state: RootState) => state.device.audioDevices);
  const speakerDevices = useSelector((state: RootState) => state.device.speakerDevices);
  const dispatch = useDispatch();

  return (
    <>
      <SettingDropdown
        menuList={videoDevices}
        selected={videoInfo}
        setSelected={(item) => {
          dispatch(requestVideoInfo({ videoInfo: item }));
        }}
      />
      <SettingDropdown
        menuList={audioDevices}
        selected={audioInfo}
        setSelected={(item) => {
          dispatch(requestAudioInfo({ audioInfo: item }));
        }}
      />
      <SettingDropdown
        menuList={speakerDevices}
        selected={speakerInfo}
        setSelected={(item) => {
          dispatch(requestSpeakerInfo({ speakerInfo: item }));
        }}
      />
    </>
  );
};
export default DeviceSelections;
