import React from 'react';
import { MenuBox, TopBar, CloseButton } from '@components/room/RoomMenu.style';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setMenuType } from '@store/room';
import RouteMenu from '@components/room/RouteMenu';
import useChatSocket from '@hooks/socket/useChatSocket';

type RoomMenuPropTypes = {
  startVoteRef: React.MutableRefObject<Function>;
  startGamesRef: React.MutableRefObject<Object>;
  onclickRequestFriend: any;
};

const RoomMenu: React.FC<RoomMenuPropTypes> = ({
  startVoteRef,
  startGamesRef,
  onclickRequestFriend,
}) => {
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
