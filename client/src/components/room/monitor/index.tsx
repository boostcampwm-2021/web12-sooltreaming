import React, { useRef } from 'react';
import Socket from '@socket/socket';
import {
  Wrapper,
  VideoWrapper,
  Video,
  Image,
  NameSpan,
} from '@components/room/monitor/index.style';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import useUpdateSpeaker from '@hooks/useUpdateSpeaker';
import useUpdateStream from '@hooks/useUpdateStream';
import useToggleSpeaker from '@hooks/useToggleSpeaker';
import useWebRTC from '@hooks/socket/useWebRTC';

type ChatFormPropTypes = {
  closeupUser: any;
};

const ChatMonitor: React.FC<ChatFormPropTypes> = ({ closeupUser }) => {
  const streams = useSelector((state: RootState) => state.room.streams);
  const stream = useSelector((state: RootState) => state.device.stream);
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const isVideoOn = useSelector((state: RootState) => state.device.isVideoOn);
  const imgUrl = useSelector((state: RootState) => state.user.imgUrl);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const className = closeupUser ? (Socket.getSID() === closeupUser ? 'closeup' : 'mini') : '';
  let count = Object.values(streams).length + 1;

  const { changeStream } = useWebRTC();
  const sendStream = () => changeStream(stream);
  useUpdateStream(myVideoRef, stream, sendStream);

  return (
    <Wrapper>
      <VideoWrapper count={count} className={className}>
        <Video count={count} ref={myVideoRef} autoPlay playsInline muted></Video>
        <Image count={count} className="myImg" src={imgUrl} isVideoOn={isVideoOn}></Image>
        <NameSpan>{nickname}</NameSpan>
      </VideoWrapper>

      {Object.entries(streams).map(([sid, otherStream]) => {
        const peerClassName = closeupUser ? (sid === closeupUser ? 'closeup' : 'mini') : '';
        return (
          <OtherVideo count={count} className={peerClassName} srcObject={otherStream} sid={sid} />
        );
      })}
    </Wrapper>
  );
};

const OtherVideo = ({ className, srcObject, count, sid }) => {
  const users = useSelector((state: RootState) => state.room.users);
  const usersDevices = useSelector((state: RootState) => state.room.usersDevices);

  const otherRef = useRef<HTMLVideoElement>(null);
  useUpdateSpeaker(otherRef);
  useToggleSpeaker(otherRef);
  useUpdateStream(otherRef, srcObject); // srcObject은 otherStream
  let isVideoOn = usersDevices[sid].isVideoOn;
  let imgUrl = users[sid].imgUrl;

  return (
    <>
      <VideoWrapper count={count} className={className}>
        <Video count={count} ref={otherRef} autoPlay playsInline></Video>
        <Image count={count} src={imgUrl} isVideoOn={isVideoOn}></Image>
        <NameSpan>{users[sid].nickname}</NameSpan>
      </VideoWrapper>
    </>
  );
};

export default ChatMonitor;
