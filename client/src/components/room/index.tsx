import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import RoomMenu from '@components/room/RoomMenu';
import ChatMonitor from '@components/room/monitor/';
import ControlBar from '@components/room/ControlBar';
import UpdownGame from '@components/room/games/UpdownGame';
import { Wrapper, VideoSection, ColumnDiv } from '@components/room/index.style';
import AnimationScreen from '@components/room/animation-screen/';
import Scaffold from '@components/room/scaffold';
import useUser from '@hooks/socket/useUser';
import useAnimation from '@hooks/socket/useAnimation';
import useGame from '@hooks/socket/useGame';
import Socket from '@socket/socket';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import {
  friendListRequest,
  sendFriendListRequest,
  receiveFriendListRequest,
} from '@src/store/friend';

const RouteGame = () => {
  const currentGame = useSelector((state: RootState) => state.room.currentGame.title);

  switch (currentGame) {
    case '업다운':
      return <UpdownGame />;
    default:
      return <></>;
  }
};

const ChatRoom: React.FC = () => {
  const dispatch = useDispatch();
  const startVoteRef = useRef<Function>(() => {});

  useEffect(() => {
    Socket.connect();
    dispatch(friendListRequest([]));
    dispatch(sendFriendListRequest([]));
    dispatch(receiveFriendListRequest([]));
    return () => {
      Socket.disconnect();
    };
  }, []);

  useUser();
  const { cheers, closeup, closeupUser } = useAnimation();
  const { GameStartHandlerList } = useGame();
  return (
    <Wrapper>
      <ColumnDiv>
        <VideoSection>
          <ChatMonitor closeupUser={closeupUser} />
          <AnimationScreen />
        </VideoSection>
        <ControlBar onClickCheers={cheers} onClickCloseup={closeup} />
      </ColumnDiv>
      <RoomMenu startVoteRef={startVoteRef} GameStartHandlerList={GameStartHandlerList} />
      <Scaffold startVoteRef={startVoteRef} />
      <RouteGame />
    </Wrapper>
  );
};

export default ChatRoom;
