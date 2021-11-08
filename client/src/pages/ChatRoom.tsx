import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Socket from '@socket/socket';
import ChatMenu from '@components/chat-room/ChatMenu';
import ChatMonitor from '@components/chat-room/ChatMonitor';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { errorMessageState } from '@src/store/message';
import { userState } from '@src/store/user';
import { Wrapper, VideoSection } from './ChatRoom.style';
import customRTC from '@utils/customRTC';

const ChatRoom: React.FunctionComponent = () => {
  const setMessage = useSetRecoilState(errorMessageState);
  const user = useRecoilValue(userState);
  const history = useHistory();
  const { code } = useParams();
  const [users, setUsers] = useState({});
  const [menuType, setMenuType] = useState<string>('채팅');
  // 임시 코드 ---------------------
  const [stream, setStream] = useState<any>(null);

  useEffect(() => {
    customRTC.getVideos().then((videos) => {
      const majorVideo = videos[0];
      if (!majorVideo) return;
      customRTC.getVideoTrack(majorVideo.deviceId).then((videoTrack) => {
        customRTC.getAudios().then((audios) => {
          const majorAudios = audios[0];
          if (!majorVideo) return;
          customRTC.getAudioTrack(majorAudios.deviceId).then((audioTrack) => {
            let stream1 = customRTC.createStream({ audioTrack, videoTrack });
            setStream(stream1);
          });
        });
      });
    });
  }, []);
  // -------------------------------
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
      <VideoSection>{stream ? <ChatMonitor users={users} stream={stream} /> : <></>}</VideoSection>
      <ChatMenu menuType={menuType} setMenuType={setMenuType} />
    </Wrapper>
  );
};

export default ChatRoom;
