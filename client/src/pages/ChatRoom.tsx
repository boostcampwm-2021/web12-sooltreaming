import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Socket from '@socket/socket';
import ChatMenu from '@components/chat-room/ChatMenu';
import ChatMonitor from '@components/chat-room/ChatMonitor';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { errorMessageState } from '@src/store/message';
import { userState } from '@src/store/user';
import { Wrapper, VideoSection } from './ChatRoom.style';

const ChatRoom: React.FunctionComponent = () => {
  const setMessage = useSetRecoilState(errorMessageState);
  const user = useRecoilValue(userState);
  const history = useHistory();
  const { code } = useParams();
  const [users, setUsers] = useState({});
  const [menuType, setMenuType] = useState<string>('채팅');

  const errorControl = (message) => {
    setMessage(message);
    history.push('/');
  };

  useEffect(() => {
    Socket.connect();
    const functions = Socket.user({ errorControl, setUsers, myID: user });
    functions.joinRoom({
      chatRoomCode: code,
      user,
    });
    return () => {
      functions?.disconnecting();
      Socket.disconnect();
    };
  }, []);

  return (
    <Wrapper>
      <VideoSection>
        <ChatMonitor chatRoomCode={code} />
      </VideoSection>
      <ChatMenu menuType={menuType} setMenuType={setMenuType} />
    </Wrapper>
  );
};

export default ChatRoom;
