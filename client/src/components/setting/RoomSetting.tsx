import React from 'react';
import { Wrapper, Column } from '@components/setting/RoomSetting.style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { requestVideoInfo, requestAudioInfo, requestSpeakerInfo } from '@store/device';
import SettingDropdown from '@components/setting/SettingDropdown';

const RoomSetting: React.FC = () => {
  const { videoInfo, audioInfo, speakerInfo, videoDevices, audioDevices, speakerDevices, stream } =
    useSelector((state: RootState) => state.device);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Column>
        <SettingDropdown
          menuList={videoDevices}
          selected={videoInfo}
          setSelected={(item) => {
            dispatch(requestVideoInfo({ videoInfo: item, stream }));
          }}
        />
        <SettingDropdown
          menuList={audioDevices}
          selected={audioInfo}
          setSelected={(item) => {
            dispatch(requestAudioInfo({ audioInfo: item, stream }));
          }}
        />
        <SettingDropdown
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
export default RoomSetting;
