import React from 'react';

import { Wrapper, TopBar, CloseButton } from '@components/chat-room/Menu.style';
import Chat from '@components/chat-room/Chat';
import RoomSetting from '@components/setting/RoomSetting';
import Host from '@src/components/chat-room/host/Host';

export type MenuPropTypes = {
  menuType: string;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
  user: object;
  users: any;
};

const RouteMenu = ({ user, users, menuType }) => {
  if (menuType === '설정') return <RoomSetting />;
  else if (menuType === '채팅') return <Chat user={user} users={users} />;
  else if (menuType === '방장') return <Host />;
  return <></>;
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
