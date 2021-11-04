import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Socket from '@socket/socket';
import ChatMenu from '@components/chat-room/ChatMenu';
import ChatMonitor from '@components/chat-room/ChatMonitor';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { errorMessageState } from '@src/store/message';
import { userState } from '@src/store/user';
import { Wrapper, VideoSection } from './ChatRoom.style';

const ChatRoom: React.FunctionComponent<RouteComponentProps> = (props) => {
  const chatRoomCode = (props.match.params as any).code;
  const [user, setUserState] = useRecoilState(userState);
  const setMessage = useSetRecoilState(errorMessageState);
  const [users, setUsers] = useState({});
  const [menuType, setMenuType] = useState<string>('채팅');

  const pushState = (roomCode) => {
    props.history.push(`/chatRoom/${roomCode}`);
  };

  useEffect(() => {
    const connected = Socket.isConnect();
    if (!connected) Socket.connect();

    if (chatRoomCode === `undefined`) {
      console.log('create-room');
      Socket.user({ setMessage, pushState, setUsers, myId: user }).createRoom(user);
    } else {
      console.log('join-room');
      Socket.user({ setMessage, pushState, setUsers, myId: user }).joinRoom({ chatRoomCode, user });
    }
  }, [props]);

  return (
    <Wrapper>
      <VideoSection>
        <ChatMonitor chatRoomCode={chatRoomCode} />
      </VideoSection>
      <ChatMenu menuType={menuType} setMenuType={setMenuType} />
    </Wrapper>
  );
};

export default ChatRoom;
