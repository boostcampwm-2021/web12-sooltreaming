import React from 'react';

import { Wrapper, TopBar, CloseButton } from '@components/chat-room/Menu.style';
import Chat from '@components/chat-room/Chat';
import RoomSetting from '@components/setting/RoomSetting';

export type MenuPropTypes = {
  menuType: string;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
  code: string;
  user: object;
  users: any;
};

const RouteMenu = ({ code, user, users, menuType }) => {
  if (menuType === '설정') return <RoomSetting />;
  else if (menuType === '채팅') return <Chat code={code} user={user} users={users} />;
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
