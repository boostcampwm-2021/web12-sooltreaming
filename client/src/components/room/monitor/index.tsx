import React, { useRef } from 'react';
import Socket from '@socket/socket';
import {
  Monitor,
  CloseUpContainer,
  CameraContainer,
  Camera,
  ImageBox,
  ProfileImage,
  Name,
} from '@components/room/monitor/index.style';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import useUpdateSpeaker from '@hooks/useUpdateSpeaker';
import useUpdateStream from '@hooks/useUpdateStream';
import useToggleSpeaker from '@hooks/useToggleSpeaker';
import useSignalSocket from '@hooks/socket/useSignalSocket';
import { MicIcon, XIcon } from '@src/components/icons';

const ChatMonitor: React.FC = () => {
  const streams = useSelector((state: RootState) => state.room.streams);
  const closeUpUser = useSelector((state: RootState) => state.room.closeUpUser);
  const stream = useSelector((state: RootState) => state.device.stream);
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const isVideoOn = useSelector((state: RootState) => state.device.isVideoOn);
  const isAudioOn = useSelector((state: RootState) => state.device.isAudioOn);
  const imgUrl = useSelector((state: RootState) => state.user.imgUrl);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const className = closeUpUser ? (Socket.getSID() === closeUpUser ? 'closeup' : 'mini') : '';
  const count = Object.values(streams).length + 1;

  const { changeStream } = useSignalSocket();
  const sendStream = () => changeStream(stream);
  useUpdateStream(myVideoRef, stream, sendStream);

  return (
    <Monitor>
      <CloseUpContainer count={count} isCloseUp={!!closeUpUser}>
        <CameraContainer className={className}>
          <Camera ref={myVideoRef} autoPlay playsInline muted />
          <ImageBox isVideoOn={isVideoOn}>
            <ProfileImage src={imgUrl} />
          </ImageBox>
          <Name>
            {nickname}
            {!isAudioOn && (
              <>
                <MicIcon width={8} height={18} stroke={'red'} />
                <XIcon width={10} height={18} />
              </>
            )}
          </Name>
        </CameraContainer>

        {Object.entries(streams).map(([sid, otherStream]) => {
          const peerClassName = closeUpUser ? (sid === closeUpUser ? 'closeup' : 'mini') : '';
          return (
            <OtherVideo key={sid} className={peerClassName} otherStream={otherStream} sid={sid} />
          );
        })}
      </CloseUpContainer>
    </Monitor>
  );
};

const OtherVideo = ({ className, otherStream, sid }) => {
  const users = useSelector((state: RootState) => state.room.users);
  const usersDevices = useSelector((state: RootState) => state.room.usersDevices);

  const otherRef = useRef<HTMLVideoElement>(null);
  useUpdateSpeaker(otherRef);
  useToggleSpeaker(otherRef);
  useUpdateStream(otherRef, otherStream);
  const { isVideoOn, isAudioOn } = usersDevices[sid];
  const imgUrl = users[sid].imgUrl;

  return (
    <CameraContainer className={className}>
      <Camera ref={otherRef} autoPlay playsInline />
      <ImageBox isVideoOn={isVideoOn}>
        <ProfileImage src={imgUrl} />
      </ImageBox>
      <Name>
        {users[sid].nickname}
        {!isAudioOn && (
          <>
            <MicIcon width={8} height={18} stroke={'red'} />
            <XIcon width={10} height={18} />
          </>
        )}
      </Name>
    </CameraContainer>
  );
};

export default ChatMonitor;
