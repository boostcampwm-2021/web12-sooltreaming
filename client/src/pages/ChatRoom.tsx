import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Socket from '@socket/socket';
import ChatMenu from '@components/chat-room/ChatMenu';
import ChatMonitor from '@components/chat-room/ChatMonitor';
import { CharRoomWrapper, CharRoomSection } from './ChatRoom.style';

const ChatRoom: React.FunctionComponent<RouteComponentProps> = (props) => {
  const chatRoomCode = (props.match.params as any).code;
  const [menuType, setMenuType] = useState<string>('채팅');

  useEffect(() => {
    Socket.connect();
    // TODO 주소 검증, 사용자 검증

    return () => {
      Socket.disconnect();
    };
  }, [props]);

  return (
    <CharRoomWrapper>
      <CharRoomSection>{/* <ChatMonitor chatRoomCode={chatRoomCode} /> */}</CharRoomSection>
      <ChatMenu menuType={menuType} setMenuType={setMenuType} />
    </CharRoomWrapper>
  );
};

export default ChatRoom;
