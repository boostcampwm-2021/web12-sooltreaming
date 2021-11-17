import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import Socket from '@socket/socket';
import { Wrapper, MessageList } from '@components/room/chat/index.style';
import ChatItem from '@components/room/chat/ChatItem';
import ChatForm from '@components/room/chat/ChatForm';
import useMessage from '@hooks/socket/useMessage';

const Chat: React.FC = () => {
  const chatLog = useSelector((state: RootState) => state.room.chatLog);
  const chatWindow = useRef<HTMLUListElement>(null);
  const myID = Socket.getSID();
  const { sendMessage } = useMessage();

  const downScroll = () => {
    const refDom = chatWindow.current;
    if (!refDom) return;
    refDom.scrollTop = refDom.scrollHeight;
  };

  useEffect(() => {
    downScroll();
  }, [chatLog]);

  return (
    <Wrapper>
      <MessageList ref={chatWindow}>
        {chatLog.map(({ sid, msg, date }, index) => (
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
    </Wrapper>
  );
};

export default Chat;
