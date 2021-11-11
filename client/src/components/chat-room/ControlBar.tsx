import React, { useState } from 'react';
import type { MenuPropTypes } from '@components/chat-room/ChatRoom';
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
const ControlBar: React.FC<MenuPropTypes> = ({ setMenuType }) => {
  const selectedMenu = ({ target }) => {
    const menuName = target.className.baseVal;
    if (!menuName) return;
    setMenuType((prev) => (prev === menuName ? '' : menuName));
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

        <VideoIcon className="비디오" />
        <MicIcon className="마이크" />
      </Div>

      <Div>
        <CloseUpIcon className="클로즈업" />
        <CheersIcon className="건배" />
      </Div>
    </Wrapper>
  );
};

export default ControlBar;
