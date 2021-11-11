import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setNoticeMessage } from '@store/notice';
import Socket from '@socket/socket';
import Menu from '@components/chat-room/Menu';
import ChatMonitor from '@components/chat-room/ChatMonitor';
import ControlBar from '@components/chat-room/ControlBar';
import { Wrapper, VideoSection, ColumnDiv } from './ChatRoom.style';
import AnimationScreen from '@src/components/animation/AnimationScreen';

type ChatRoomTypes = {
  stream: MediaStream;
};

export type ControlBarPropTypes = {
  onClickCheers: any;
  menuType: string;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
};

export type MenuPropTypes = {
  stream: MediaStream;
  menuType: string;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
  code: string;
  user: object;
};

const ChatRoom: React.FunctionComponent<ChatRoomTypes> = ({ stream }) => {
  const activateCheers = useRef<any>(() => {});
  const history = useHistory();
  const { code } = useParams();

  const { id, imgUrl, nickname } = useSelector((state: RootState) => state.user);
  const user = { id, imgUrl, nickname };
  const [users, setUsers] = useState({});
  const [menuType, setMenuType] = useState<string>('채팅');
  const [isCheers, setIsCheers] = useState<boolean>(false);

  const errorControl = (message) => {
    const dispatch = useDispatch();
    dispatch(setNoticeMessage({ errorMessage: message }));
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
        <ControlBar onClickCheers={cheers} menuType={menuType} setMenuType={setMenuType} />
      </ColumnDiv>
      <Menu stream={stream} menuType={menuType} setMenuType={setMenuType} code={code} user={user} />
    </Wrapper>
  );
};

export default ChatRoom;
