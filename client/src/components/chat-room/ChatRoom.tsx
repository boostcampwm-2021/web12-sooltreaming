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
import CheersCanvas from '@src/components/animation/CheersCanvas';

const ChatRoom: React.FunctionComponent = () => {
  const history = useHistory();
  const { code } = useParams();

  const setMessage = useSetRecoilState(errorMessageState);
  const user = useRecoilValue(userState);
  const videoInfo = useRecoilValue(videoState);
  const audioInfo = useRecoilValue(audioState);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState({});
  const [menuType, setMenuType] = useState<string>('채팅');
  const [stream, setStream] = useState<MediaStream>(new MediaStream());
  const [isCheers, setIsCheers] = useState<boolean>(false);

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

  const cheers = (e) => {
    if (isCheers === false) {
      const functions = Socket.animation({ setIsCheers });
      functions.activateCheers();
      return () => {
        functions.disconnecting();
      };
    }
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <Wrapper>
        <CheersCanvas isCheers={isCheers} setIsCheers={setIsCheers} />
        <VideoSection>
          <ChatMonitor users={users} stream={stream} />
        </VideoSection>
        <ChatMenu menuType={menuType} setMenuType={setMenuType} />
      </Wrapper>
      <button onClick={cheers}>건배</button>
    </>
  );
};

export default ChatRoom;
