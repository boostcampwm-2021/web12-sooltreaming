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
import Loading from '@components/custom/Loading';

const ChatRoom: React.FunctionComponent = () => {
  const history = useHistory();
  const { code } = useParams();
  console.log(code);

  const setMessage = useSetRecoilState(errorMessageState);
  const user = useRecoilValue(userState);
  const videoInfo = useRecoilValue(videoState);
  const audioInfo = useRecoilValue(audioState);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState({});
  const [menuType, setMenuType] = useState<string>('채팅');
  const [stream, setStream] = useState<MediaStream>(new MediaStream());

  useEffect(() => {
    const initStream = async () => {
      const videoTrack = await customRTC.getVideoTrack(videoInfo?.deviceId);
      const audioTrack = await customRTC.getAudioTrack(audioInfo?.deviceId);
      const createdStream = await customRTC.createStream({ videoTrack, audioTrack });
      setStream(createdStream);
      setIsLoading(false);
    };
    initStream();
  }, []);

  const errorControl = (message) => {
    setMessage(message);
    history.push('/');
  };

  useEffect(() => {
    if (isLoading) return;
    Socket.connect();
    const functions = Socket.user({ errorControl, setUsers, myID: user });
    functions.joinRoom({
      chatRoomCode: code,
      user,
    });
  }, [isLoading]);

  if (isLoading) return <Loading />;
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
