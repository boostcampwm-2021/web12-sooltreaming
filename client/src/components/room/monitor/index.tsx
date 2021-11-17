import React, { useState, useEffect, useRef } from 'react';
import Socket from '@socket/socket';
import { Wrapper, VideoWrapper, Video, Image } from '@components/room/monitor/index.style';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import useUpdateSpeaker from '@hooks/useUpdateSpeaker';
import useUpdateStream from '@hooks/useUpdateStream';
import useToggleSpeaker from '@hooks/useToggleSpeaker';

type ChatFormPropTypes = {
  users: any;
  closeupUser: any;
};

const ChatMonitor: React.FC<ChatFormPropTypes> = ({ users, closeupUser }) => {
  const socket = useRef<any>(null);
  const stream = useSelector((state: RootState) => state.device.stream);
  const isVideoOn = useSelector((state: RootState) => state.device.isVideoOn);
  const { id, imgUrl, nickname } = useSelector((state: RootState) => state.user);
  const [streams, setStreams] = useState<{ [key: string]: MediaStream }>({});
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const className = closeupUser ? (Socket.getSID() === closeupUser ? 'closeup' : 'mini') : '';
  let count = Object.values(streams).length + 1;

  useEffect(() => {
    // Socket으로 Peer Connection 만들기
    const webRTCSocket = Socket.webRTC({ setStreams, stream });
    socket.current = webRTCSocket;
    return () => {
      webRTCSocket.disconnecting();
    };
  }, []);

  const sendStream = () => {
    socket.current?.changeStream(stream);
  };
  useUpdateStream(myVideoRef, stream, sendStream);

  return (
    <Wrapper>
      <VideoWrapper count={count} className={className}>
        <Video count={count} ref={myVideoRef} autoPlay playsInline muted></Video>
        <Image count={count} className="myImg" src={imgUrl} isVideoOn={isVideoOn}></Image>
      </VideoWrapper>

      {Object.entries(streams).map(([sid, otherStream]) => {
        const peerClassName = closeupUser ? (sid === closeupUser ? 'closeup' : 'mini') : '';
        return (
          <OtherVideo
            count={count}
            className={peerClassName}
            srcObject={otherStream}
            users={users}
            sid={sid}
          />
        );
      })}
    </Wrapper>
  );
};

const OtherVideo = ({ className, srcObject, count, users, sid }) => {
  const otherRef = useRef<HTMLVideoElement>(null);
  useUpdateSpeaker(otherRef);
  useToggleSpeaker(otherRef);
  useUpdateStream(otherRef, srcObject); // srcObject은 otherStream
  let isVideoOn = users[sid].isVideoOn;
  let imgUrl = users[sid].imgUrl;
  // map으로 하나씩 보내줄 떄 오는 sid: otherStream의 isVideoOn 정보는 users[sid].isVideoOn가 담고있지 않을까????

  return (
    <>
      <VideoWrapper count={count} className={className}>
        <Video count={count} ref={otherRef} autoPlay playsInline></Video>
        <Image count={count} src={imgUrl} isVideoOn={isVideoOn}></Image>
      </VideoWrapper>
    </>
  );
};

export default ChatMonitor;