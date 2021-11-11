import React, { useState, useEffect, useRef, useCallback } from 'react';
import Socket from '@socket/socket';
import { useRecoilState } from 'recoil';
import { videoActiveState, audioActiveState } from '@src/store/device';
import { Wrapper } from './ChatMonitor.style';

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
      <video
        className="myFace"
        ref={myVideoRef}
        width="400"
        height="400"
        autoPlay
        playsInline
      ></video>
      <button onClick={() => setIsAudioOn((prev) => !prev)}>
        {isAudioOn ? '음소거' : '음소거 해제'}
      </button>
      <button onClick={() => setIsVideoOn((prev) => !prev)}>
        {isVideoOn ? '영상 끄기' : '영상 켜기'}
      </button>
      <select className="camera">
        <option value="device">카메라명</option>
      </select>
      {Object.values(streams).map((otherStream) => {
        return <OtherVideo srcObject={otherStream} />;
      })}
    </Wrapper>
  );
};

const OtherVideo = ({ srcObject }) => {
  const otherRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!otherRef.current) return;
    otherRef.current.srcObject = srcObject ? srcObject : null;
  }, [srcObject]);

  return (
    <video
      ref={otherRef}
      className="peerFace"
      width="400"
      height="400"
      autoPlay
      playsInline
    ></video>
  );
};

export default ChatMonitor;
