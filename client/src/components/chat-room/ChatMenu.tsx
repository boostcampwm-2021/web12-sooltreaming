import React from 'react';
import { Wrapper, TopBar, CloseButton } from '@components/chat-room/ChatMenu.style';
import Chat from '@components/chat-room/Chat';

type ChatMenuPropTypes = {
  menuType: string;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
};

const RouteMenu = ({ menuType }) => {
  switch (menuType) {
    case '채팅':
      return <Chat />;
    default:
      return <></>;
  }
};

const ChatMenu: React.FC<ChatMenuPropTypes> = ({ menuType, setMenuType }) => {
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

export default ChatMenu;
