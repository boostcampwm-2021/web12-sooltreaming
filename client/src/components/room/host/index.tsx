import React from 'react';
import { Wrapper } from '@components/room/host/index.style';

import ParticipantController from '@components/room/host/ParticipantController';
import RoomController from '@components/room/host/RoomController';
import useRoomControl from '@hooks/socket/useRoomControl';



const Host: React.FC = () => {
  const { toggleRoomEntry } = useRoomControl();
  return (
    <Wrapper>
      <ParticipantController />
      <RoomController toggleRoomEntry={toggleRoomEntry} />
    </Wrapper>
  );
};

export default Host;
