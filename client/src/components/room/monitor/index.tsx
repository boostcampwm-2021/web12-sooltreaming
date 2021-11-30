import React from 'react';
import { Monitor, CloseUpContainer } from '@components/room/monitor/index.style';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import OtherVideo from '@components/room/monitor/OtherVideo';
import MyVideo from '@components/room/monitor/MyVideo';

const ChatMonitor: React.FC = (): React.ReactElement => {
  const streams = useSelector((state: RootState) => state.room.streams);
  const closeUpUser = useSelector((state: RootState) => state.room.closeUpUser);
  const count = Object.values(streams).length + 1;

  return (
    <Monitor>
      <CloseUpContainer count={count} isCloseUp={!!closeUpUser}>
        <MyVideo />
        {Object.entries(streams).map(([sid, otherStream]) => {
          const peerClassName = closeUpUser ? (sid === closeUpUser ? 'closeup' : 'mini') : '';
          return (
            <OtherVideo key={sid} className={peerClassName} otherStream={otherStream} sid={sid} />
          );
        })}
      </CloseUpContainer>
    </Monitor>
  );
};

export default ChatMonitor;
