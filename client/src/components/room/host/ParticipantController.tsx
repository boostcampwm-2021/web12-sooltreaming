import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { Wrapper } from '@components/room/host/ParticipantController.style';
import Participant from '@components/room/host/Participant';

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
