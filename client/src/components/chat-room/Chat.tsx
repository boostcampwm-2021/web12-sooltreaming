import React, { useEffect, useState, useRef } from 'react';
import Socket from '@socket/socket';
import { ChatWrapper } from './Chat.style';
import { useRecoilState } from 'recoil';
import { chatCountState } from '@src/store/message';
import ChatForm from '@components/chat-room/ChatForm';

const Chat: React.FC = () => {
  const emits = useRef({});
  const [chatLog, setChatLog] = useState([]);
  const [unCheckCount, setUnCheckCount] = useRecoilState(chatCountState);

  useEffect(() => {
    emits.current = Socket.message({ setChatLog });
  }, []);

  return (
    <ChatWrapper>
      {chatLog.map(({ message, date, index }) => (
        <div key={index}>
          {message}/{date}
        </div>
      ))}
      <ChatForm emits={emits} />
    </ChatWrapper>
  );
};

export default Chat;
