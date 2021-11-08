import React from 'react';
import { Wrapper, Column, VideoBox } from './SettingWindow.style.js';

import SettingMenu from './SettingMenu';
import { VideoIcon, MicIcon } from '@components/icons';

const SettingModal: React.FunctionComponent = () => {

  const videoList = ['cam1', 'cam2', 'cam3'];
  const micList = ['mic1', 'mic2', 'mic3'];

  return (
    <Wrapper>
      <VideoBox />
      <Column>
        <SettingMenu
            menuList={videoList}
            Icon={VideoIcon}
        />          
        <SettingMenu
          menuList={micList}
          Icon={MicIcon}
        />
      </Column>
    </Wrapper>
  );
};


export default SettingModal;
