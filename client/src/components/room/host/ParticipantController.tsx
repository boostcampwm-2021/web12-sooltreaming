import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { ColumnBox } from '@components/room/host/ParticipantController.style';
import Participant from '@components/room/host/Participant';

const ParticipantController = ({ turnOffOtherVideo, turnOffOtherAudio }): React.ReactElement => {
  const users = useSelector((state: RootState) => state.room.users);
  const hostSID = useSelector((state: RootState) => state.room.hostSID);
  const usersDevices = useSelector((state: RootState) => state.room.usersDevices);

  return (
    <ColumnBox>
      {Object.entries(users).map(([sid, user]) => {
        if (hostSID === sid) return null;
        return (
          <Participant
            key={`Participant-${sid}`}
            sid={sid}
            user={user}
            userDevices={usersDevices[sid]}
            turnOffOtherVideo={turnOffOtherVideo}
            turnOffOtherAudio={turnOffOtherAudio}
          />
        );
      })}
    </ColumnBox>
  );
};

export default ParticipantController;
