import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { IconContainer, CountBox } from '@components/room/chat/ChatMenuIcon.style';
import { ChatIcon } from '@components/icons';

const ChatMenuIcon = (): React.ReactElement => {
  const unreadChat = useSelector((state: RootState) => state.room.unreadChat);

  return (
    <IconContainer data-type="채팅">
      {!!unreadChat && <CountBox>{unreadChat}</CountBox>}
      <ChatIcon />
    </IconContainer>
  );
};

export default ChatMenuIcon;
