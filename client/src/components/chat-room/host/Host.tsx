import React from 'react'
import { Wrapper } from '@src/components/chat-room/host/Host.style';

import ParticipantController from './ParticipantController';
import RoomController from './RoomController';

const Host = () => {
  return (
    <Wrapper>
      <ParticipantController />
      <RoomController />
    </Wrapper>
  )
}

export default Host
