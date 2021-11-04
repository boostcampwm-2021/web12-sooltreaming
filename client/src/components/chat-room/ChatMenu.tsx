import React from 'react';
import {
  ChatMenuWrapper,
  ChatMenuTopBar,
  ChatCloseButton,
} from '@components/chat-room/ChatMenu.style';
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
    <ChatMenuWrapper>
      <ChatMenuTopBar>
        <span>{menuType}</span>
        <ChatCloseButton onClick={() => setMenuType('')}></ChatCloseButton>
      </ChatMenuTopBar>
      <RouteMenu menuType={menuType} />
    </ChatMenuWrapper>
  );
};

export default ChatMenu;
