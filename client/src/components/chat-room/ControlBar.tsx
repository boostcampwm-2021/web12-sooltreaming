import React from 'react';
import DeviceToggleButton from '@components/setting/DeviceToggleButton';
import type { ControlBarPropTypes } from '@components/chat-room/ChatRoom';
import { useRecoilState } from 'recoil';
import { videoActiveState, audioActiveState } from '@src/store/device';

import {
  HostIcon,
  GameIcon,
  PeopleIcon,
  ChatIcon,
  SettingIcon,
  VideoIcon,
  MicIcon,
  XIcon,
  CloseUpIcon,
  CheersIcon,
} from '@components/icons';

import { Wrapper, Div } from '@components/chat-room/ControlBar.style';

// 방장 개임기/ 사람 채팅 설정 클로즈업 건배
const ControlBar: React.FC<ControlBarPropTypes> = ({ onClickCheers, setMenuType }) => {
  const [isVideoOn, setIsVideoOn] = useRecoilState<boolean>(videoActiveState);
  const [isAudioOn, setIsAudioOn] = useRecoilState<boolean>(audioActiveState);

  const MENU = {
    클로즈업: {},
    건배: onClickCheers,
  };
  const selectedMenu = ({ target }) => {
    const menuName = target.className.baseVal;
    if (!menuName) return;
    (MENU[menuName] || setMenuType((prev) => (prev === menuName ? '' : menuName)))();
  };

  return (
    <Wrapper onClick={selectedMenu}>
      <Div>
        <HostIcon className="방장" />
        <GameIcon className="게임" />
      </Div>

      <Div>
        <PeopleIcon className="참가자" />
        <ChatIcon className="채팅" />
        <SettingIcon className="설정" />

        <DeviceToggleButton Icon={VideoIcon} isDeviceOn={isVideoOn} setIsDeviceOn={setIsVideoOn} />
        <DeviceToggleButton Icon={MicIcon} isDeviceOn={isAudioOn} setIsDeviceOn={setIsAudioOn} />
      </Div>

      <Div>
        <CloseUpIcon className="클로즈업" />
        <CheersIcon className="건배" />
      </Div>
    </Wrapper>
  );
};

export default ControlBar;
