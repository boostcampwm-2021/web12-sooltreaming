import React from 'react';

import { Wrapper, TopBar, CloseButton } from '@components/chat-room/Menu.style';
import Chat from '@components/chat-room/Chat';
import RoomSetting from '@components/setting/RoomSetting';
import Host from '@src/components/chat-room/host/Host';
import Users from '@src/components/user/Users';

export type MenuPropTypes = {
  menuType: string;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
  user: object;
  users: any;
};

const RouteMenu = ({ user, users, menuType }) => {
  switch (menuType) {
    case '설정':
      return <RoomSetting />;
    case '채팅':
      return <Chat user={user} users={users} />;
    case '참가자':
      return <Users users={users} />;
    case '방장':
      return <Host />;
    default:
      return <></>;
  }
};

const Menu: React.FC<MenuPropTypes> = (props) => {
  const { menuType, setMenuType } = props;

  if (!menuType) return <></>;
  return (
    <Wrapper>
      <TopBar>
        <span>{menuType}</span>
        <CloseButton onClick={() => setMenuType('')}></CloseButton>
      </TopBar>
      <RouteMenu {...props} />
    </Wrapper>
  );
};

export default Menu;
