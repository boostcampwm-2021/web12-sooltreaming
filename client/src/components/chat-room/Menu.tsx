import React from 'react';
import type { MenuPropTypes } from '@components/chat-room/ChatRoom';

import { Wrapper, TopBar, CloseButton } from '@components/chat-room/ChatMenu.style';
import Chat from '@components/chat-room/Chat';

const RouteMenu = ({ menuType }) => {
  switch (menuType) {
    case '방장':
      return <div></div>;
    case '게임':
      return <div></div>;
    case '참가자':
      return <div></div>;
    case '채팅':
      return <Chat />;
    case '설정':
      return <div></div>;
    case '클로즈업':
      return <div></div>;
    case '건배':
      return <div></div>;

    default:
      return <div></div>;
  }
};

const Menu: React.FC<MenuPropTypes> = ({ menuType, setMenuType }) => {
  if (!menuType) return <></>;
  return (
    <Wrapper>
      <TopBar>
        <span>{menuType}</span>
        <CloseButton onClick={() => setMenuType('')}></CloseButton>
      </TopBar>
      <RouteMenu menuType={menuType} />
    </Wrapper>
  );
};

export default Menu;
