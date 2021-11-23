import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import RoomMenu from '@components/room/RoomMenu';
import ChatMonitor from '@components/room/monitor/';
import ControlBar from '@components/room/ControlBar';
import { Wrapper, VideoSection, ColumnDiv } from '@components/room/index.style';
import AnimationScreen from '@components/room/animation-screen/';
import Scaffold from '@components/room/scaffold';
import Games from '@components/room/games';
import useAnimationSocket from '@hooks/socket/useAnimationSocket';
import Socket from '@socket/socket';
import {
  friendListRequest,
  sendFriendListRequest,
  receiveFriendListRequest,
} from '@src/store/friend';

const ChatRoom: React.FC = () => {
  const dispatch = useDispatch();
  const startVoteRef = useRef<Function>(() => {});
  const startGamesRef = useRef<Function>(() => {});

  useEffect(() => {
    Socket.connect();
    dispatch(friendListRequest([]));
    dispatch(sendFriendListRequest([]));
    dispatch(receiveFriendListRequest([]));
    return () => {
      Socket.disconnect();
    };
  }, []);

  const { activateCheers, activateCloseup, deactivateCloseup } = useAnimationSocket();
  return (
    <Wrapper>
      <ColumnDiv>
        <VideoSection>
          <ChatMonitor />
          <AnimationScreen />
        </VideoSection>
        <ControlBar
          onClickCheers={activateCheers}
          activateCloseup={activateCloseup}
          deactivateCloseup={deactivateCloseup}
        />
      </ColumnDiv>
      <RoomMenu startVoteRef={startVoteRef} startGamesRef={startGamesRef} />
      <Scaffold startVoteRef={startVoteRef} />
      <Games startGamesRef={startGamesRef} />
    </Wrapper>
  );
};

export default ChatRoom;
