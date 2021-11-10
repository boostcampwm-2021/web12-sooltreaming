import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Socket from '@socket/socket';
import ChatMenu from '@components/chat-room/ChatMenu';
import ChatMonitor from '@components/chat-room/ChatMonitor';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { errorMessageState } from '@src/store/message';
import { userState } from '@src/store/user';
import { Wrapper, VideoSection } from './ChatRoom.style';

type ChatRoomType = {
  stream: MediaStream;
  setStream: any;
};

const ChatRoom: React.FunctionComponent<ChatRoomType> = ({ stream, setStream }) => {
  const history = useHistory();
  const { code } = useParams();

  const setMessage = useSetRecoilState(errorMessageState);
  const user = useRecoilValue(userState);
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
  }, []);

  return (
    <Wrapper>
      <VideoSection>
        <ChatMonitor users={users} stream={stream} />
      </VideoSection>
      <ChatMenu menuType={menuType} setMenuType={setMenuType} />
    </Wrapper>
  );
};

export default ChatRoom;
