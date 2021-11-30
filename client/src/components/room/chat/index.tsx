import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import Socket from '@socket/socket';
import { ScrollBox, MessageList } from '@components/room/chat/index.style';
import ChatItem from '@components/room/chat/ChatItem';
import ChatForm from '@components/room/chat/ChatForm';
import type { ChatPropType } from '@ts-types/components/room';

const Chat: React.FC<ChatPropType> = ({ sendMessage }): React.ReactElement => {
  const chatLog = useSelector((state: RootState) => state.room.chatLog);
  const chatWindow = useRef<HTMLUListElement>(null);
  const myID = Socket.getSID();

  const downScroll = (): void => {
    const refDom = chatWindow.current;
    if (!refDom) return;
    refDom.scrollTop = refDom.scrollHeight;
  };

  useEffect(() => {
    downScroll();
  }, [chatLog]);

  return (
    <ScrollBox>
      <MessageList ref={chatWindow}>
        {chatLog.map(({ sid, msg, date }) => (
          <ChatItem
            key={`chat-${sid}-${msg}-${date}`}
            sid={sid}
            isSelf={myID === sid}
            message={msg}
            date={date}
          />
        ))}
      </MessageList>
      <ChatForm sendMessage={sendMessage} />
    </ScrollBox>
  );
};

export default Chat;
