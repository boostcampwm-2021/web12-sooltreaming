import React from 'react';
import { Wrapper, Column } from './RoomSetting.style';
import { useDispatch } from 'react-redux';
import { setVideoInfo, setAudioInfo } from '@store/device';
import SettingDropdown from '@components/setting/SettingDropdown';
import useSetting from '@src/hooks/useSetting';

type RoomSettingType = {
  stream: MediaStream;
};

const RoomSetting: React.FunctionComponent<RoomSettingType> = ({ stream }) => {
  const { videoInfo, audioInfo, videoDevices, audioDevices, isLoading } = useSetting(stream);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      {isLoading ? (
        <></>
      ) : (
        <Column>
          <SettingDropdown
            menuList={videoDevices}
            selected={videoInfo}
            setSelected={(item) => {
              dispatch(setVideoInfo({ videoInfo: item }));
            }}
          />
          <SettingDropdown
            menuList={audioDevices}
            selected={audioInfo}
            setSelected={(item) => {
              dispatch(setAudioInfo({ audioInfo: item }));
            }}
          />
        </Column>
      )}
    </Wrapper>
  );
};

export default RoomSetting;
