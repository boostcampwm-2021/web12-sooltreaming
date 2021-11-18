import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import RoomMenu from '@components/room/RoomMenu';
import ChatMonitor from '@components/room/monitor/';
import ControlBar from '@components/room/ControlBar';
import { Wrapper, VideoSection, ColumnDiv } from '@components/room/index.style';
import AnimationScreen from '@components/room/animation-screen/';
import Scaffold from '@components/room/scaffold';
import useUser from '@hooks/socket/useUser';
import useAnimation from '@hooks/socket/useAnimation';
import Socket from '@socket/socket';
import {
  friendListRequest,
  sendFriendListRequest,
  receiveFriendListRequest,
} from '@src/store/friend';

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

  return (
    <Wrapper>
      <ColumnDiv>
        <VideoSection>
          <ChatMonitor closeupUser={closeupUser} />
          <AnimationScreen />
        </VideoSection>
        <ControlBar onClickCheers={cheers} onClickCloseup={closeup} />
      </ColumnDiv>
      <RoomMenu startVoteRef={startVoteRef} />
      <Scaffold startVoteRef={startVoteRef} />
    </Wrapper>
  );
};

export default ChatRoom;
