import React, { useState, useEffect, useRef, useCallback } from 'react';
import Socket from '@socket/socket';

type ChatFormPropTypes = {
  users: any;
  stream: any;
};

const ChatMonitor: React.FC<ChatFormPropTypes> = ({ users, stream }) => {
  const [isVideoOn, setIsVideoOn] = useState<boolean>(false);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false);
  const [streams, setStreams] = useState({});

  const myVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 내 영상 출력하기
    if (myVideoRef && myVideoRef.current) myVideoRef.current.srcObject = stream as MediaProvider;
    // Socket으로 Peer Connection 만들기
    const webRTCSocket = Socket.webRTC({ setStreams, myStream: stream });
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

  return (
    <>
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
        {isVideoOn ? '영상 켜기' : '영상 끄기'}
      </button>
      <select className="camera">
        <option value="device">카메라명</option>
      </select>
      {Object.values(streams).map((otherStream) => {
        return <OtherVideo srcObject={otherStream} />;
      })}
    </>
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
