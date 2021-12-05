import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import {
  CameraContainer,
  Camera,
  ImageBox,
  ProfileImage,
  Name,
} from '@components/room/monitor/Video.style';
import useUpdateSpeaker from '@hooks/useUpdateSpeaker';
import useUpdateStream from '@hooks/useUpdateStream';
import useToggleSpeaker from '@hooks/useToggleSpeaker';
import { MicIcon, XIcon } from '@components/icons';
import type { OtherVideoPropType } from '@ts-types/components/room';

const OtherVideo: React.FC<OtherVideoPropType> = ({
  className,
  otherStream,
  sid,
}): React.ReactElement => {
  const users = useSelector((state: RootState) => state.room.users);
  const usersDevices = useSelector((state: RootState) => state.room.usersDevices);

  const otherRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  useUpdateSpeaker(audioRef);
  useToggleSpeaker(audioRef);
  useUpdateStream(otherRef, otherStream);
  useUpdateStream(audioRef, otherStream);
  const { isVideoOn, isAudioOn } = usersDevices[sid] ?? {};
  const { nickname, imgUrl } = users[sid] ?? {};

  return (
    <CameraContainer className={className}>
      <Camera ref={otherRef} autoPlay playsInline muted />
      <audio ref={audioRef} autoPlay />
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

export default OtherVideo;
