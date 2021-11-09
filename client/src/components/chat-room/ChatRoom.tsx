import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Socket from '@socket/socket';
import ChatMenu from '@components/chat-room/ChatMenu';
import ChatMonitor from '@components/chat-room/ChatMonitor';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { errorMessageState } from '@src/store/message';
import { videoState, audioState } from '@src/store/device';
import { userState } from '@src/store/user';
import { Wrapper, VideoSection } from './ChatRoom.style';
import customRTC from '@utils/customRTC';

const ChatRoom: React.FunctionComponent = () => {
  const history = useHistory();
  const { code } = useParams();

  const setMessage = useSetRecoilState(errorMessageState);
  const user = useRecoilValue(userState);
  const videoInfo = useRecoilValue(videoState);
  const audioInfo = useRecoilValue(audioState);

  const [users, setUsers] = useState({});
  const [menuType, setMenuType] = useState<string>('채팅');
  const [stream, setStream] = useState<MediaStream>(new MediaStream());

  useEffect(() => {
    const initStream = async () => {
      const videoTrack = await customRTC.getVideoTrack(videoInfo?.deviceId);
      const audioTrack = await customRTC.getAudioTrack(audioInfo?.deviceId);
      const createdStream = customRTC.createStream({ videoTrack, audioTrack });
      setStream(createdStream);
    };
    initStream();
  }, []);

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
      functions.disconnecting();
      Socket.disconnect();
    };
  }, []);

  return (
    <Wrapper>
      {/* 비동기로 stream을 불러와서 임시로 chatmonitor를 안불러왔음 (오류 안내려고) */}
      {/* stream이 없어도 chatmonitor가 오류없이 동작하도록 만들어야함 */}
      <VideoSection>{stream ? <ChatMonitor users={users} stream={stream} /> : <></>}</VideoSection>
      <ChatMenu menuType={menuType} setMenuType={setMenuType} />
    </Wrapper>
  );
};

export default ChatRoom;
