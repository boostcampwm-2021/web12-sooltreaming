import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Socket from '@socket/socket';
import Menu from '@components/chat-room/Menu';
import ChatMonitor from '@components/chat-room/ChatMonitor';
import ControlBar from '@components/chat-room/ControlBar';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { errorMessageState } from '@src/store/message';
import { userState } from '@src/store/user';
import { Wrapper, VideoSection, ColumnDiv } from './ChatRoom.style';
import AnimationScreen from '@src/components/animation/AnimationScreen';

type ChatRoomTypes = {
  stream: MediaStream;
};

export type ControlBarPropTypes = {
  menuType: string;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
};

export type MenuPropTypes = {
  stream: MediaStream;
  menuType: string;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
};

const ChatRoom: React.FunctionComponent<ChatRoomTypes> = ({ stream }) => {
  const activateCheers = useRef<any>(() => {});
  const history = useHistory();
  const { code } = useParams();

  const setMessage = useSetRecoilState(errorMessageState);
  const user = useRecoilValue(userState);
  const [users, setUsers] = useState({});
  const [menuType, setMenuType] = useState<string>('채팅');
  const [isCheers, setIsCheers] = useState<boolean>(false);

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

  useEffect(() => {
    const functions = Socket.animation({ setIsCheers });
    activateCheers.current = functions.activateCheers;
    return () => {
      functions.disconnecting();
    };
  }, []);

  const cheers = (e) => {
    if (isCheers) return;
    activateCheers.current({
      chatRoomCode: code,
      user,
    });
  };

  return (
    <Wrapper>
      <ColumnDiv>
        <VideoSection>
          <ChatMonitor users={users} stream={stream} />
          <AnimationScreen isCheers={isCheers} setIsCheers={setIsCheers} code={code} user={user} />
        </VideoSection>
        <ControlBar menuType={menuType} setMenuType={setMenuType} />
      </ColumnDiv>
      <Menu stream={stream} menuType={menuType} setMenuType={setMenuType} />
    </Wrapper>
  );
};

export default ChatRoom;
