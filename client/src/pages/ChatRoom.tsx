import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ChatMonitor from '@components/chat-room/ChatMonitor';
import Chat from '@components/chat-room/Chat';
import socket from '@socket/socket';

import { useSetRecoilState, useRecoilState } from 'recoil';
import { errorMessageState } from '@src/store/message';
import { userState } from '@src/store/user';

const ChatRoom: React.FunctionComponent<RouteComponentProps> = (props) => {
  const chatRoomCode = (props.match.params as any).code;
  const [user, setUserState] = useRecoilState(userState);
  const setMessage = useSetRecoilState(errorMessageState);
  const [users, setUsers] = useState({});

  const pushState = (roomCode) => {
    props.history.push(`/chatRoom/${roomCode}`);
  };

  useEffect(() => {
    const connected = socket.isConnect();
    if (!connected) socket.connect();

    if (chatRoomCode === `undefined`) {
      console.log('create-room');
      socket.user({ setMessage, pushState, setUsers, myId: user }).createRoom(user);
    } else {
      console.log('join-room');
      socket.user({ setMessage, pushState, setUsers, myId: user }).joinRoom({ chatRoomCode, user });
    }
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
