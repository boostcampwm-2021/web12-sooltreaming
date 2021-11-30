import React from 'react';
import { ControlBox } from '@components/room/host/index.style';

import ParticipantController from '@components/room/host/ParticipantController';
import RoomController from '@components/room/host/RoomController';
import useControlSocket from '@hooks/socket/useControlSocket';

const Host: React.FC = (): React.ReactElement => {
  const { toggleRoomEntry, turnOffOtherVideo, turnOffOtherAudio } = useControlSocket();
  return (
    <ControlBox>
      <ParticipantController
        turnOffOtherVideo={turnOffOtherVideo}
        turnOffOtherAudio={turnOffOtherAudio}
      />
      <RoomController toggleRoomEntry={toggleRoomEntry} />
    </ControlBox>
  );
};

export default Host;
