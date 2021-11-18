import React from 'react';
import { Wrapper, TopBar, CloseButton } from '@components/room/RoomMenu.style';
import Chat from '@components/room/chat/';
import RoomSetting from '@components/setting/RoomSetting';
import Host from '@components/room/host/';
import Users from '@components/user/Users';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setMenuType } from '@store/room';

type RoomMenuPropTypes = {
  startVoteRef: React.MutableRefObject<Function>;
};

const RouteMenu = ({ startVoteRef }) => {
  const { menuType } = useSelector((state: RootState) => state.room);
  switch (menuType) {
    case '설정':
      return <RoomSetting />;
    case '채팅':
      return <Chat />;
    case '참가자':
      return <Users startVoteRef={startVoteRef} />;
    case '방장':
      return <Host />;
    default:
      return <></>;
  }
};

const RoomMenu: React.FC<RoomMenuPropTypes> = ({ startVoteRef }) => {
  const { menuType } = useSelector((state: RootState) => state.room);
  const dispatch = useDispatch();
  if (!menuType) return <></>;
  return (
    <Wrapper>
      <TopBar>
        <span>{menuType}</span>
        <CloseButton onClick={() => dispatch(setMenuType(''))}></CloseButton>
      </TopBar>
      <RouteMenu startVoteRef={startVoteRef} />
    </Wrapper>
  );
};

export default RoomMenu;
