import React, { useState, useEffect, useRef } from 'react';
import Socket from '@socket/socket';
import { Wrapper, VideoWrapper, Video, Image } from '@components/chat-room/ChatMonitor.style';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import useUpdateSpeaker from '@hooks/useUpdateSpeaker';
import useUpdateStream from '@hooks/useUpdateStream';
import useToggleSpeaker from '@hooks/useToggleSpeaker';

type ChatFormPropTypes = {
  users: any;
};

type UserType = {
  id: string;
  imgUrl: string;
  nickname: string;
};

const ChatMonitor: React.FC<ChatFormPropTypes> = ({ users }) => {
  const socket = useRef<any>(null);
  const stream = useSelector((state: RootState) => state.device.stream);
  const isVideoOn = useSelector((state: RootState) => state.device.isVideoOn);
  const [streams, setStreams] = useState({});
  const myVideoRef = useRef<HTMLVideoElement>(null);
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
      <VideoWrapper count={count}>
        <Video count={count} className="myFace" ref={myVideoRef} autoPlay playsInline muted></Video>
        <Image count={count} className="myImg" src="/images/logo.png" isVideoOn={isVideoOn}></Image>
      </VideoWrapper>

      {Object.values(streams).map((otherStream) => {
        return <OtherVideo count={count} srcObject={otherStream} />;
      })}
    </Wrapper>
  );
};

const OtherVideo = ({ srcObject, count }) => {
  const otherRef = useRef<HTMLVideoElement>(null);

  useUpdateSpeaker(otherRef);
  useToggleSpeaker(otherRef);
  useUpdateStream(otherRef, srcObject); // srcObject은 otherStream
  const isVideoOn = srcObject.getVideoTracks()[0].enabled;

  return (
    <>
      <VideoWrapper count={count}>
        <Video count={count} ref={otherRef} className="peerFace" autoPlay playsInline></Video>
        <Image
          count={count}
          src="/images/logo.png"
          className="peerImg"
          isVideoOn={isVideoOn}
        ></Image>
      </VideoWrapper>
    </>
  );
};

export default ChatMonitor;
