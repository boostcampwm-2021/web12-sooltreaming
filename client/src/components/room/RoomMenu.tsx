import React from 'react';
import { Wrapper, TopBar, CloseButton } from '@components/room/RoomMenu.style';
import Chat from '@components/room/chat/';
import RoomSetting from '@components/setting/RoomSetting';
import Host from '@components/room/host/';
import Users from '@components/user/Users';

export type RoomMenuPropTypes = {
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

const RoomMenu: React.FC<RoomMenuPropTypes> = (props) => {
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

export default RoomMenu;
