import React from 'react';
import { MenuBox, TopBar, CloseButton } from '@components/room/RoomMenu.style';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setMenuType } from '@store/room';
import RouteMenu from '@components/room/RouteMenu';
import useChatSocket from '@hooks/socket/useChatSocket';
import type { RoomMenuPropType } from '@ts-types/components/room';

const RoomMenu: React.FC<RoomMenuPropType> = ({
  startVoteRef,
  startGamesRef,
  onclickRequestFriend,
}): React.ReactElement => {
  const menuType = useSelector((state: RootState) => state.room.menuType);
  const dispatch = useDispatch();

  const { sendMessage } = useChatSocket();

  if (!menuType) return <></>;
  return (
    <MenuBox>
      <TopBar>
        <span>{menuType}</span>
        <CloseButton onClick={() => dispatch(setMenuType(''))}></CloseButton>
      </TopBar>
      <RouteMenu
        startVoteRef={startVoteRef}
        sendMessage={sendMessage}
        startGamesRef={startGamesRef}
        onclickRequestFriend={onclickRequestFriend}
      />
    </MenuBox>
  );
};

export default RoomMenu;
