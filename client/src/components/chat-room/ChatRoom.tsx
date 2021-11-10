import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Socket from '@socket/socket';
import Menu from '@components/chat-room/Menu';
import ChatMonitor from '@components/chat-room/ChatMonitor';
import ControlBar from '@components/chat-room/ControlBar';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { errorMessageState } from '@src/store/message';
import { userState } from '@src/store/user';
import { Wrapper, VideoSection, ColumnDiv } from './ChatRoom.style';

type ChatRoomTypes = {
  stream: MediaStream;
  setStream: any;
};

export type MenuPropTypes = {
  menuType: string;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
};

const ChatRoom: React.FunctionComponent<ChatRoomTypes> = ({ stream, setStream }) => {
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
      <ColumnDiv>
        <VideoSection>
          <ChatMonitor users={users} stream={stream} />
        </VideoSection>
        <ControlBar menuType={menuType} setMenuType={setMenuType} />
      </ColumnDiv>
      <Menu menuType={menuType} setMenuType={setMenuType} />
    </Wrapper>
  );
};

export default ChatRoom;
