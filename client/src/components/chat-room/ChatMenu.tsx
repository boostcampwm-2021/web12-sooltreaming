import React from 'react';
import { Wrapper, TopBar, CloseButton } from '@components/chat-room/ChatMenu.style';
import Chat from '@components/chat-room/Chat';

type ChatMenuPropTypes = {
  menuType: string;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
  code: string;
  user: object;
};

const RouteMenu = ({ menuType, code, user }) => {
  switch (menuType) {
    case '채팅':
      return <Chat code={code} user={user} />;
    default:
      return <></>;
  }
};

const ChatMenu: React.FC<ChatMenuPropTypes> = ({ menuType, setMenuType, code, user }) => {
  if (!menuType) return <></>;
  return (
    <Wrapper>
      <TopBar>
        <span>{menuType}</span>
        <CloseButton onClick={() => setMenuType('')}></CloseButton>
      </TopBar>
      <RouteMenu menuType={menuType} code={code} user={user} />
    </Wrapper>
  );
};

export default ChatMenu;
