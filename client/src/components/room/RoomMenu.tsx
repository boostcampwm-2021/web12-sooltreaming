import React from 'react';
import { Wrapper, TopBar, CloseButton } from '@components/room/RoomMenu.style';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setMenuType } from '@store/room';
import RouteMenu from '@components/room/RouteMenu';
import useChatSocket from '@hooks/socket/useChatSocket';

type RoomMenuPropTypes = {
  startVoteRef: React.MutableRefObject<Function>;
  GameStartHandlerList: Object;
};

const RoomMenu: React.FC<RoomMenuPropTypes> = ({ startVoteRef, GameStartHandlerList }) => {
  const menuType = useSelector((state: RootState) => state.room.menuType);
  const dispatch = useDispatch();

  const { sendMessage } = useChatSocket();

  if (!menuType) return <></>;
  return (
    <Wrapper>
      <TopBar>
        <span>{menuType}</span>
        <CloseButton onClick={() => dispatch(setMenuType(''))}></CloseButton>
      </TopBar>
      <RouteMenu
        startVoteRef={startVoteRef}
        sendMessage={sendMessage}
        GameStartHandlerList={GameStartHandlerList}
      />
    </Wrapper>
  );
};

export default RoomMenu;
