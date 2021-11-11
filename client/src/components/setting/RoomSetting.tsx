import React from 'react';
import { Wrapper, Column } from './RoomSetting.style';
import SettingDropdown from '@components/setting/SettingDropdown';
import useSetting from '@src/hooks/useSetting';

type RoomSettingType = {
  stream: MediaStream;
};

const RoomSetting: React.FunctionComponent<RoomSettingType> = ({ stream }) => {
  const {
    videos,
    audios,
    selectedVideo,
    setSelectedVideo,
    selectedAudio,
    setSelectedAudio,
    isLoading,
  } = useSetting(stream);

  if (!(selectedVideo.state === 'hasValue' && selectedAudio.state === 'hasValue')) return <></>;

  return (
    <Wrapper>
      {isLoading ? (
        <></>
      ) : (
        <Column>
          <SettingDropdown
            menuList={videos}
            selected={selectedVideo.contents}
            setSelected={setSelectedVideo}
          />
          <SettingDropdown
            menuList={audios}
            selected={selectedAudio.contents}
            setSelected={setSelectedAudio}
          />
        </Column>
      )}
    </Wrapper>
  );
};

export default RoomSetting;
