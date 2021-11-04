import React, { useEffect, useState, useRef } from 'react';
import Socket from '@socket/socket';
import { ChatWrapper, ChatWindow } from './Chat.style';
import { useRecoilState } from 'recoil';
import { chatCountState } from '@src/store/message';
import ChatForm from '@components/chat-room/ChatForm';

const Chat: React.FC = () => {
  const emits = useRef({});
  const chatWindow = useRef<HTMLDivElement>(null);
  const [chatLog, setChatLog] = useState([]);
  const [unCheckCount, setUnCheckCount] = useRecoilState(chatCountState);

  const downScroll = () => {
    const refDom = chatWindow?.current;
    if (!refDom) return;
    refDom.scrollTop = refDom.scrollHeight;
  };

  useEffect(() => {
    downScroll();
  }, [chatLog]);

  useEffect(() => {
    emits.current = Socket.message({ setChatLog });
  }, []);

  return (
    <ChatWrapper>
      <ChatWindow ref={chatWindow}>
        {chatLog.map(({ message, date, index }) => (
          <div key={index}>
            {message}/{date}
          </div>
        ))}
      </ChatWindow>
      <ChatForm emits={emits} />
    </ChatWrapper>
  );
};

export default Chat;
