import React from 'react';
import { Wrapper } from '@components/room/host/index.style';

import ParticipantController from '@components/room/host/ParticipantController';
import RoomController from '@components/room/host/RoomController';
import useRoomControl from '@hooks/socket/useRoomControl';



const Host: React.FC = () => {
  const {toggleRoomEntry, turnOffOtherVideo, turnOffOtherAudio} = useRoomControl();
  return (
    <Wrapper>
      <ParticipantController turnOffOtherVideo={turnOffOtherVideo} turnOffOtherAudio={turnOffOtherAudio}/>
      <RoomController toggleRoomEntry={toggleRoomEntry} />
    </Wrapper>
  );
};

export default Host;
