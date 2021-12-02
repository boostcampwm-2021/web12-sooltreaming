import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { requestVideoInfo, requestAudioInfo, requestSpeakerInfo } from '@store/device';
import SettingDropdown from '@components/setting/SettingDropdown';

const DeviceSelections: React.FC = (): React.ReactElement => {
  const { videoInfo, audioInfo, speakerInfo, videoDevices, audioDevices, speakerDevices } =
    useSelector((state: RootState) => state.device);
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
