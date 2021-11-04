import React, { useEffect, useState, useRef } from 'react';
import Socket from '@socket/socket';
import { Wrapper, MessageList } from './Chat.style';
import { useRecoilState } from 'recoil';
import { chatCountState } from '@src/store/message';
import ChatItem from '@components/chat-room/ChatItem';
import ChatForm from '@components/chat-room/ChatForm';

type ChatPropTypes = {};

const Chat: React.FC<ChatPropTypes> = ({}) => {
  const emits = useRef({});
  const chatWindow = useRef<HTMLUListElement>(null);
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
    <Wrapper>
      <MessageList ref={chatWindow}>
        {chatLog.map(({ message, date }, index) => (
          <ChatItem isSelf={true} message={message} date={date} key={index} />
        ))}
      </MessageList>
      <ChatForm emits={emits} />
    </Wrapper>
  );
};

export default Chat;
