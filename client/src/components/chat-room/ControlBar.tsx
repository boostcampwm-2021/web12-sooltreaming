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
  CloseUpIcon,
  CheersIcon,
} from '@components/icons';
import { Wrapper, Div, Button } from '@components/chat-room/ControlBar.style';

const IconButton = (Icon: React.ReactNode, className: string) => {
  return <Button className={className}>{Icon}</Button>;
};

// 방장 개임기/ 사람 채팅 설정 클로즈업 건배
const ControlBar: React.FC<ControlBarPropTypes> = ({ onClickCheers, setMenuType }) => {
  const [isVideoOn, setIsVideoOn] = useRecoilState<boolean>(videoActiveState);
  const [isAudioOn, setIsAudioOn] = useRecoilState<boolean>(audioActiveState);

  const MENU = {
    클로즈업: () => {},
    건배: onClickCheers,
  };
  const selectedMenu = ({ target }) => {
    const menuName = target.classList[2];
    if (!menuName) return;
    if (MENU[menuName]) MENU[menuName]();
    else setMenuType((prev) => (prev === menuName ? '' : menuName));
  };

  return (
    <Wrapper onClick={selectedMenu}>
      <Div>
        {IconButton(<HostIcon />, '방장')}
        {IconButton(<GameIcon />, '게임')}
      </Div>

      <Div>
        {IconButton(<PeopleIcon />, '참가자')}
        {IconButton(<ChatIcon />, '채팅')}
        {IconButton(<SettingIcon />, '설정')}

        <DeviceToggleButton Icon={VideoIcon} isDeviceOn={isVideoOn} setIsDeviceOn={setIsVideoOn} />
        <DeviceToggleButton Icon={MicIcon} isDeviceOn={isAudioOn} setIsDeviceOn={setIsAudioOn} />
      </Div>

      <Div>
        {IconButton(<CloseUpIcon />, '클로즈업')}
        {IconButton(<CheersIcon />, '건배')}
      </Div>
    </Wrapper>
  );
};

export default ControlBar;
