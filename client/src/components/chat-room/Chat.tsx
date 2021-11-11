import React, { useEffect, useState, useRef } from 'react';
import Socket from '@socket/socket';
import { Wrapper, MessageList } from './Chat.style';
import { useRecoilState } from 'recoil';
import { chatCountState } from '@src/store/message';
import ChatItem from '@components/chat-room/ChatItem';
import ChatForm from '@components/chat-room/ChatForm';

type ChatPropTypes = {
  code: string;
  user: object;
};

const Chat: React.FC<ChatPropTypes> = ({ code, user }) => {
  const emits = useRef<any>(() => {});
  const chatWindow = useRef<HTMLUListElement>(null);
  const [chatLog, setChatLog] = useState([]);
  const [unCheckCount, setUnCheckCount] = useRecoilState(chatCountState);
  const myID = Socket.getSID();

  const downScroll = () => {
    const refDom = chatWindow.current;
    if (!refDom) return;
    refDom.scrollTop = refDom.scrollHeight;
  };

  useEffect(() => {
    downScroll();
  }, [chatLog]);

  useEffect(() => {
    const functions = Socket.message({ setChatLog });
    emits.current = functions.sendMessage;
    console.log(chatLog, 'adasd');
    return () => {
      functions.disconnecting();
    };
  }, []);

  return (
    <Wrapper>
      <MessageList ref={chatWindow}>
        {chatLog.map(({ sid, msg, date }, index) => (
          <ChatItem isSelf={myID === sid} message={msg} date={date} key={index} />
        ))}
      </MessageList>
      <ChatForm emits={emits} code={code} user={user} />
    </Wrapper>
  );
};

export default Chat;
