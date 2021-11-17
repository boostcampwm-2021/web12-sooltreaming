import React from 'react';
import { Wrapper } from '@components/room/host/index.style';

import ParticipantController from '@components/room/host/ParticipantController';
import RoomController from '@components/room/host/RoomController';

const Host = () => {
  return (
    <Wrapper>
      <ParticipantController />
      <RoomController />
    </Wrapper>
  );
};

export default Host;
