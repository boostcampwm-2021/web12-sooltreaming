import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { Wrapper, CountBox } from '@components/room/chat/ChatMenuIcon.style';
import { ChatIcon } from '@components/icons';

const ChatMenuIcon = (): React.ReactElement => {
  const unreadChat = useSelector((state: RootState) => state.room.unreadChat);

  return (
    <Wrapper data-type="채팅">
      {!!unreadChat && <CountBox>{unreadChat}</CountBox>}
      <ChatIcon />
    </Wrapper>
  );
};

export default ChatMenuIcon;
