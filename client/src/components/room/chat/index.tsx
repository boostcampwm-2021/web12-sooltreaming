import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Socket from '@socket/socket';
import { Wrapper, MessageList } from '@components/room/chat/index.style';
import ChatItem from '@components/room/chat/ChatItem';
import ChatForm from '@components/room/chat/ChatForm';

type ChatPropTypes = {
  user: object;
  users: any;
};

const Chat: React.FC<ChatPropTypes> = ({ user, users }) => {
  const { code } = useParams();
  const emits = useRef<any>(() => {});
  const chatWindow = useRef<HTMLUListElement>(null);
  const [chatLog, setChatLog] = useState([]);
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
          <ChatItem
            isSelf={myID === sid}
            message={msg}
            date={date}
            key={index}
            users={users}
            sid={sid}
          />
        ))}
      </MessageList>
      <ChatForm emits={emits} code={code} user={user} />
    </Wrapper>
  );
};

export default Chat;
