import React, { useMemo } from 'react';
import type { MenuPropTypes } from '@components/chat-room/ChatRoom';

import { Wrapper, TopBar, CloseButton } from '@components/chat-room/ChatMenu.style';
import Chat from '@components/chat-room/Chat';

const Menu: React.FC<MenuPropTypes> = ({ menuType, setMenuType }) => {
  const MENU = useMemo(() => {
    return {
      방장: <></>,
      게임: <></>,
      참가자: <></>,
      설정: <></>,
      채팅: <Chat />,
      클로즈업: <></>,
      건배: <></>,
    };
  }, []);

  const RouteMenu = ({ menuType }) => {
    return MENU[menuType] || <></>;
  };

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
