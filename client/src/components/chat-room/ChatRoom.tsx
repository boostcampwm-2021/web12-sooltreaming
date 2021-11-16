import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setNoticeMessage } from '@store/notice';
import { resetRoomInfo, setHost } from '@store/room';
import Socket from '@socket/socket';
import Menu from '@components/chat-room/Menu';
import ChatMonitor from '@components/chat-room/ChatMonitor';
import ControlBar from '@components/chat-room/ControlBar';
import { Wrapper, VideoSection, ColumnDiv } from './ChatRoom.style';
import AnimationScreen from '@src/components/animation/AnimationScreen';

const ChatRoom: React.FC = () => {
  const dispatch = useDispatch();
  const activateCheers = useRef<any>(() => {});
  const history = useHistory();
  const { code } = useParams();

  const { id, imgUrl, nickname } = useSelector((state: RootState) => state.user);
  const user = { id, imgUrl, nickname };
  const [users, setUsers] = useState({});
  const [menuType, setMenuType] = useState<string>('채팅');
  const [isCheers, setIsCheers] = useState<boolean>(false);

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
    const functions = Socket.animation({ setIsCheers });
    activateCheers.current = functions.activateCheers;
    return () => {
      functions.disconnecting();
      dispatch(resetRoomInfo({}));
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
          <ChatMonitor users={users} />
          <AnimationScreen isCheers={isCheers} setIsCheers={setIsCheers} user={user} />
        </VideoSection>
        <ControlBar onClickCheers={cheers} setMenuType={setMenuType} />
      </ColumnDiv>
      <Menu menuType={menuType} setMenuType={setMenuType} user={user} users={users} />
    </Wrapper>
  );
};

export default ChatRoom;
