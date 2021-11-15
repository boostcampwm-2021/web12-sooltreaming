import React from 'react';
import { Wrapper, Column } from './RoomSetting.style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { requestVideoInfo, requestAudioInfo, requestSpeakerInfo } from '@store/device';
import SettingDropdown from '@components/setting/SettingDropdown';

const RoomSetting: React.FC = () => {
  const { videoInfo, audioInfo, videoDevices, audioDevices, stream } = useSelector(
    (state: RootState) => state.device,
  );
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
      </Column>
    </Wrapper>
  );
};

export default RoomSetting;
