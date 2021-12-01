import React, { useEffect, useRef } from 'react';
import RoomMenu from '@components/room/RoomMenu';
import ChatMonitor from '@components/room/monitor/';
import ControlBar from '@components/room/ControlBar';
import { FullScreen, FlexBox, ColumnBox } from '@components/room/index.style';
import AnimationScreen from '@components/room/animation-screen/';
import Scaffold from '@components/room/scaffold';
import Games from '@components/room/games';
import useAnimationSocket from '@hooks/socket/useAnimationSocket';
import useFriendSocket from '@src/hooks/socket/useFriendSocket';

import Socket from '@socket/socket';

const ChatRoom: React.FC = (): React.ReactElement => {
  const startVoteRef = useRef<Function>(() => {});
  const startGamesRef = useRef<Function>(() => {});

  useEffect(() => {
    Socket.connect();
    return () => {
      Socket.disconnect();
    };
  }, []);

  const { activateCheers, activateCloseup, deactivateCloseup } = useAnimationSocket();
  const { onclickRequestFriend } = useFriendSocket();
  return (
    <FullScreen>
      <ColumnBox>
        <FlexBox>
          <ChatMonitor />
          <AnimationScreen />
        </FlexBox>
        <ControlBar
          onClickCheers={activateCheers}
          activateCloseup={activateCloseup}
          deactivateCloseup={deactivateCloseup}
        />
      </ColumnBox>
      <RoomMenu
        startVoteRef={startVoteRef}
        startGamesRef={startGamesRef}
        onclickRequestFriend={onclickRequestFriend}
      />
      <Scaffold startVoteRef={startVoteRef} />
      <Games startGamesRef={startGamesRef} />
    </FullScreen>
  );
};

export default ChatRoom;
