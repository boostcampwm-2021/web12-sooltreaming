import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ChatMenu from '@components/chat-room/ChatMenu';
import ChatMonitor from '@components/chat-room/ChatMonitor';
import { CharRoomWrapper, CharRoomSection } from './ChatRoom.style';

const ChatRoom: React.FunctionComponent<RouteComponentProps> = (props) => {
  const chatRoomCode = (props.match.params as any).code;
  const [menuType, setMenuType] = useState<string>('채팅');

  useEffect(() => {
    // TODO 주소 검증, 사용자 검증
  }, [props]);

  return (
    <CharRoomWrapper>
      <CharRoomSection>{/* <ChatMonitor chatRoomCode={chatRoomCode} /> */}</CharRoomSection>
      <ChatMenu menuType={menuType} setMenuType={setMenuType} />
    </CharRoomWrapper>
  );
};

export default ChatRoom;
