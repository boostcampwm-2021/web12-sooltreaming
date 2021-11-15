import React, { useState, useEffect, useRef } from 'react';
import Socket from '@socket/socket';
import { Wrapper, Video } from '@components/chat-room/ChatMonitor.style';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';

type ChatFormPropTypes = {
  users: any;
};

const ChatMonitor: React.FC<ChatFormPropTypes> = ({ users }) => {
  const socket = useRef<any>(null);
  const stream = useSelector((state: RootState) => state.device.stream);
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
      <Video count={count} className="myFace" ref={myVideoRef} autoPlay playsInline></Video>
      {Object.values(streams).map((otherStream) => {
        return <OtherVideo count={count} srcObject={otherStream} />;
      })}
    </Wrapper>
  );
};

const OtherVideo = ({ srcObject, count }) => {
  const otherRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!otherRef.current) return;
    otherRef.current.srcObject = srcObject ? srcObject : null;
  }, [srcObject]);

  return <Video count={count} ref={otherRef} className="peerFace" autoPlay playsInline></Video>;
};

export default ChatMonitor;
