import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import Socket from '@socket/socket';
import {
  CameraContainer,
  Camera,
  ImageBox,
  ProfileImage,
  Name,
} from '@components/room/monitor/Video.style';
import useUpdateStream from '@hooks/useUpdateStream';
import useSignalSocket from '@hooks/socket/useSignalSocket';
import { MicIcon, XIcon } from '@components/icons';

const MyVideo: React.FC = (): React.ReactElement => {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const isVideoOn = useSelector((state: RootState) => state.device.isVideoOn);
  const isAudioOn = useSelector((state: RootState) => state.device.isAudioOn);
  const imgUrl = useSelector((state: RootState) => state.user.imgUrl);
  const closeUpUser = useSelector((state: RootState) => state.room.closeUpUser);
  const className = closeUpUser ? (Socket.getSID() === closeUpUser ? 'closeup' : 'mini') : '';
  const stream = useSelector((state: RootState) => state.device.stream);

  const { changeStream } = useSignalSocket();
  const sendStream = () => changeStream(stream);
  useUpdateStream(myVideoRef, stream, sendStream);

  return (
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
  );
};

export default MyVideo;
