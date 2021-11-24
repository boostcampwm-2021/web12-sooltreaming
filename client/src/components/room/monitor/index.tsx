import React, { useRef } from 'react';
import Socket from '@socket/socket';
import {
  Monitor,
  CameraContainer,
  Camera,
  ProfileImage,
  Name,
} from '@components/room/monitor/index.style';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import useUpdateSpeaker from '@hooks/useUpdateSpeaker';
import useUpdateStream from '@hooks/useUpdateStream';
import useToggleSpeaker from '@hooks/useToggleSpeaker';
import useSignalSocket from '@hooks/socket/useSignalSocket';

const ChatMonitor: React.FC = () => {
  const streams = useSelector((state: RootState) => state.room.streams);
  const closeUpUser = useSelector((state: RootState) => state.room.closeUpUser);
  const stream = useSelector((state: RootState) => state.device.stream);
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const isVideoOn = useSelector((state: RootState) => state.device.isVideoOn);
  const imgUrl = useSelector((state: RootState) => state.user.imgUrl);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const className = closeUpUser ? (Socket.getSID() === closeUpUser ? 'closeup' : 'mini') : '';
  let count = Object.values(streams).length + 1;

  const { changeStream } = useSignalSocket();
  const sendStream = () => changeStream(stream);
  useUpdateStream(myVideoRef, stream, sendStream);

  return (
    <Monitor>
      <CameraContainer count={count} className={className}>
        <Camera count={count} ref={myVideoRef} autoPlay playsInline muted />
        <ProfileImage count={count} className="myImg" src={imgUrl} isVideoOn={isVideoOn} />
        <Name>{nickname}</Name>
      </CameraContainer>

      {Object.entries(streams).map(([sid, otherStream]) => {
        const peerClassName = closeUpUser ? (sid === closeUpUser ? 'closeup' : 'mini') : '';
        return (
          <OtherVideo count={count} className={peerClassName} srcObject={otherStream} sid={sid} />
        );
      })}
    </Monitor>
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
    <CameraContainer count={count} className={className}>
      <Camera count={count} ref={otherRef} autoPlay playsInline />
      <ProfileImage count={count} src={imgUrl} isVideoOn={isVideoOn} />
      <Name>{users[sid].nickname}</Name>
    </CameraContainer>
  );
};

export default ChatMonitor;
