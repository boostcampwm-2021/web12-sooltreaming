import React from 'react';
import { useSelector } from 'react-redux';
import {
  Wrapper,
  UserSection,
  CircleDiv,
  NameSpan,
  MsgContent,
} from '@components/room/chat/ChatItem.style';
import { HumanIcon } from '@components/icons';
import { RootState } from '@src/store';

type ChatItemPropTypes = {
  isSelf: boolean;
  message: string;
  date: string;
  sid: string;
};

const ChatItem: React.FC<ChatItemPropTypes> = ({ isSelf, message, date, sid }) => {
  const users = useSelector((state: RootState) => state.room.users);
  const { imgUrl, nickname } = useSelector((state: RootState) => state.user);
  const targetNick = isSelf ? nickname : users[sid]?.nickname;
  const targetImg = isSelf ? imgUrl : users[sid]?.imgUrl;

  return (
    <Wrapper isSelf={isSelf}>
      <UserSection isSelf={isSelf}>
        <CircleDiv>
          {targetImg ? <img src={targetImg} alt="UserProfile" /> : <HumanIcon />}
        </CircleDiv>
        <NameSpan>{targetNick || 'judangs'}</NameSpan>
        <span>{date}</span>
      </UserSection>
      <MsgContent isSelf={isSelf}>{message}</MsgContent>
    </Wrapper>
  );
};

export default ChatItem;
