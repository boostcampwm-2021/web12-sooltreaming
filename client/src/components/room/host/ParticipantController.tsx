import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import {
  Wrapper,
  RowWrapper,
  ProfileDiv,
  ControlDiv,
} from '@components/room/host/ParticipantController.style';

import { HumanIcon, VideoIcon, MicIcon } from '@components/icons';
import DeviceToggleButton from '@components/setting/DeviceToggleButton';

const Participant = ({ sid, user, userDevices, turnOffOtherVideo, turnOffOtherAudio }) => {
  const targetNick = user?.nickname;
  const targetImg = user?.imgUrl;
  const isVideoOn = userDevices?.isVideoOn;
  const isAudioOn = userDevices?.isAudioOn;

  const turnOffVideo = () => {
    if (!isVideoOn) return;
    turnOffOtherVideo({ sid, isVideoOn: false });
  };

  const turnOffAudio = () => {
    if (!isAudioOn) return;
    turnOffOtherAudio({ sid, isAudioOn: false });
  };

  return (
    <RowWrapper>
      <ProfileDiv>
        {targetImg ? <img src={targetImg} alt="other_user_image" /> : <HumanIcon />}
        <span>{targetNick || 'judangs'}</span>
      </ProfileDiv>
      <ControlDiv>
        <DeviceToggleButton
          Icon={VideoIcon}
          isDeviceOn={isVideoOn}
          setIsDeviceOn={() => turnOffVideo()}
        />
        <DeviceToggleButton
          Icon={MicIcon}
          isDeviceOn={isAudioOn}
          setIsDeviceOn={() => turnOffAudio()}
        />
      </ControlDiv>
    </RowWrapper>
  );
};

const ParticipantController = ({ turnOffOtherVideo, turnOffOtherAudio }) => {
  const users = useSelector((state: RootState) => state.room.users);
  const hostSID = useSelector((state: RootState) => state.room.hostSID);
  const usersDevices = useSelector((state: RootState) => state.room.usersDevices);

  return (
    <Wrapper>
      {Object.entries(users).map(([sid, user], index) => {
        if (hostSID === sid) return <></>;
        return (
          <Participant
            sid={sid}
            user={user}
            userDevices={usersDevices[sid]}
            turnOffOtherVideo={turnOffOtherVideo}
            turnOffOtherAudio={turnOffOtherAudio}
          />
        );
      })}
    </Wrapper>
  );
};

export default ParticipantController;
