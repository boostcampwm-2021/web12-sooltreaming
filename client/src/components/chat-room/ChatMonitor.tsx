import React, { useState, useEffect, useRef, useCallback } from 'react';
import Socket from '@socket/socket';
import { useRecoilState } from 'recoil';
import { videoActiveState, audioActiveState } from '@src/store/device';

import { Video, Wrapper } from '@components/chat-room/ChatMonitor.style';

type ChatFormPropTypes = {
  users: any;
  stream: MediaStream;
};

const ChatMonitor: React.FC<ChatFormPropTypes> = ({ users, stream }) => {
  const socket = useRef<any>(null);
  const [isVideoOn, setIsVideoOn] = useRecoilState<boolean>(videoActiveState);
  const [isAudioOn, setIsAudioOn] = useRecoilState<boolean>(audioActiveState);
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

  useEffect(() => {
    stream?.getVideoTracks().forEach((track) => (track.enabled = isVideoOn));
  }, [isVideoOn]);
  useEffect(() => {
    stream?.getAudioTracks().forEach((track) => (track.enabled = isAudioOn));
  }, [isAudioOn]);
  useEffect(() => {
    if (!socket.current || !myVideoRef.current) return;
    socket.current.changeStream(stream);
    myVideoRef.current.srcObject = stream;
    stream?.getVideoTracks().forEach((track) => (track.enabled = isVideoOn));
    stream?.getAudioTracks().forEach((track) => (track.enabled = isAudioOn));
  }, [stream]);

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
