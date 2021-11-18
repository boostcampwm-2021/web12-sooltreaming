import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { Wrapper, RowWrapper, ProfileDiv, ControlDiv } from '@components/room/host/ParticipantController.style';

import { HumanIcon, VideoIcon, MicIcon } from '@components/icons';
import DeviceToggleButton from '@components/setting/DeviceToggleButton';

const Participant = ({sid, user, userDevices, turnOffOtherVideo}) => {
  const targetNick = user?.nickname;
  const targetImg = user?.imgUrl;
  const isVideoOn = userDevices?.isVideoOn;

  const turnOffVideo = () => {
    if(!isVideoOn) return;
    turnOffOtherVideo({sid, isVideoOn: false});
  }

  
  return (
    <RowWrapper>
      <ProfileDiv>
        {targetImg ? <img src={targetImg} alt="other_user_image"/> : <HumanIcon />}
        <span>{targetNick || 'judangs'}</span>
      </ProfileDiv>
      <ControlDiv>
        <DeviceToggleButton Icon={VideoIcon} isDeviceOn={isVideoOn} setIsDeviceOn={() => turnOffVideo()} />
      </ControlDiv>
    </RowWrapper>
  );
};


const ParticipantController = ({ turnOffOtherVideo }) => {
  const users = useSelector((state: RootState) => state.room.users);
  const hostId = useSelector((state: RootState) => state.room.hostId);
  const usersDevices = useSelector((state: RootState) => state.room.usersDevices);

  return (
    <Wrapper>
      {Object.entries(users).map(([sid, user], index) => {
        if(hostId === sid) return <></>;
        return <Participant sid={sid} user={user} userDevices={usersDevices[sid]} turnOffOtherVideo={turnOffOtherVideo} />
      })}
    </Wrapper>
  )
}

export default ParticipantController
