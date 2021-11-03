import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ChatMonitor from '@components/chat-room/ChatMonitor';
import Chat from '@components/chat-room/Chat';

const ChatRoom: React.FunctionComponent<RouteComponentProps> = (props) => {
  const chatRoomCode = (props.match.params as any).code;

  useEffect(() => {
    // TODO 주소 검증, 사용자 검증
  }, [props]);

  return (
    <div>
      <ChatMonitor chatRoomCode={chatRoomCode} />
      <Chat />
      <span>{chatRoomCode}</span>
    </div>
  );
};

export default ChatRoom;
