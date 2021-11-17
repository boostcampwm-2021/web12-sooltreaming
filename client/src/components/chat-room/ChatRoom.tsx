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
import Scaffold from '@components/chat-room/scaffold';

const ChatRoom: React.FC = () => {
  const dispatch = useDispatch();
  const activateCheers = useRef<any>(() => {});
  const activateCloseup = useRef<any>(() => {});
  const deactivateCloseup = useRef<any>(() => {});
  const history = useHistory();
  const { code } = useParams();

  const { id, imgUrl, nickname } = useSelector((state: RootState) => state.user);
  const user = { id, imgUrl, nickname };
  const [users, setUsers] = useState({});
  const [menuType, setMenuType] = useState<string>('채팅');
  const [isCheers, setIsCheers] = useState<boolean>(false);
  const [closeupUser, setCloseupUser] = useState<string>('');
  const errorControl = (message) => {
    dispatch(setNoticeMessage({ errorMessage: message }));
    history.push('/');
  };

  useEffect(() => {
    Socket.connect();
    const functions = Socket.user({ errorControl, setUsers });
    functions.joinRoom({
      chatRoomCode: code,
      user,
    });
  }, []);

  useEffect(() => {
    const functions = Socket.animation({ setIsCheers, setCloseupUser });
    activateCheers.current = functions.activateCheers;
    activateCloseup.current = functions.activateCloseup;
    deactivateCloseup.current = functions.deactivateCloseup;
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

  const closeup = (e) => {
    if (closeupUser) {
      deactivateCloseup.current({
        chatRoomCode: code,
        closeupUser,
      });
    } else {
      activateCloseup.current({
        chatRoomCode: code,
        sid: Socket.getSID(),
      });
    }
  };

  return (
    <Wrapper>
      <ColumnDiv>
        <VideoSection>
          <ChatMonitor users={users} closeupUser={closeupUser} />
          <AnimationScreen isCheers={isCheers} setIsCheers={setIsCheers} code={code} user={user} />
        </VideoSection>
        <ControlBar onClickCheers={cheers} onClickCloseup={closeup} setMenuType={setMenuType} />
      </ColumnDiv>
      <Menu menuType={menuType} setMenuType={setMenuType} code={code} user={user} users={users} />
      <Scaffold />
    </Wrapper>
  );
};

export default ChatRoom;
