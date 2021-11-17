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
  const { id, imgUrl, nickname } = useSelector((state: RootState) => state.user);
  const [streams, setStreams] = useState<{ [key: string]: MediaStream }>({});
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
        <Image count={count} className="myImg" src={imgUrl} isVideoOn={isVideoOn}></Image>
      </VideoWrapper>

      {Object.entries(streams).map(([sid, otherStream]) => {
        return <OtherVideo count={count} srcObject={otherStream} users={users} sid={sid} />;
      })}
    </Wrapper>
  );
};

const OtherVideo = ({ srcObject, count, users, sid }) => {
  const otherRef = useRef<HTMLVideoElement>(null);

  useUpdateSpeaker(otherRef);
  useToggleSpeaker(otherRef);
  useUpdateStream(otherRef, srcObject); // srcObject은 otherStream
  let isVideoOn = users[sid].isVideoOn;
  let imgUrl = users[sid].imgUrl;
  // map으로 하나씩 보내줄 떄 오는 sid: otherStream의 isVideoOn 정보는 users[sid].isVideoOn가 담고있지 않을까????

  console.log(srcObject, '보이는영상');
  console.log(users[sid], '유저정보');
  console.log(sid, 'sid');
  console.log(otherRef);
  console.log(isVideoOn);

  return (
    <>
      <VideoWrapper count={count}>
        <Video count={count} ref={otherRef} className="peerFace" autoPlay playsInline></Video>
        <Image count={count} src={imgUrl} isVideoOn={isVideoOn}></Image>
      </VideoWrapper>
    </>
  );
};

export default ChatMonitor;
