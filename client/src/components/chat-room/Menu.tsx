import React, { useMemo } from 'react';
import type { MenuPropTypes } from '@components/chat-room/ChatRoom';

import { Wrapper, TopBar, CloseButton } from '@components/chat-room/Menu.style';
import Chat from '@components/chat-room/Chat';
import RoomSetting from '@components/setting/RoomSetting';

const RouteMenu = ({ code, user, users, stream, menuType }) => {
  if (menuType === '설정') return <RoomSetting stream={stream} />;
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
