import React, { useEffect } from 'react';
import RoomMenu from '@components/room/RoomMenu';
import ChatMonitor from '@components/room/monitor/';
import ControlBar from '@components/room/ControlBar';
import { Wrapper, VideoSection, ColumnDiv } from '@components/room/index.style';
import AnimationScreen from '@components/room/animation-screen/';
import Scaffold from '@components/room/scaffold';
import useUser from '@hooks/socket/useUser';
import useAnimation from '@hooks/socket/useAnimation';
import Socket from '@socket/socket';

const ChatRoom: React.FC = () => {
  useEffect(() => {
    Socket.connect();
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
      <RoomMenu />
      <Scaffold />
    </Wrapper>
  );
};

export default ChatRoom;
