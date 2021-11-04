import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Socket from '@socket/socket';
import ChatMenu from '@components/chat-room/ChatMenu';
import ChatMonitor from '@components/chat-room/ChatMonitor';
import { Wrapper, VideoSection } from './ChatRoom.style';

const ChatRoom: React.FunctionComponent<RouteComponentProps> = (props) => {
  const chatRoomCode = (props.match.params as any).code;
  const [menuType, setMenuType] = useState<string>('채팅');

  useEffect(() => {
    // Should be deleted
    Socket.connect();
    return () => {
      Socket.disconnect();
    };
    // -----------------
  }, [props]);

  return (
    <Wrapper>
      <VideoSection>{/* <ChatMonitor chatRoomCode={chatRoomCode} /> */}</VideoSection>
      <ChatMenu menuType={menuType} setMenuType={setMenuType} />
    </Wrapper>
  );
};

export default ChatRoom;
