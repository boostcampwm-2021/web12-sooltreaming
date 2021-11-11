import React from 'react';
import { Wrapper, UserSection, CircleDiv, NameSpan, MsgContent } from './ChatItem.style';
import { HumanIcon } from '@components/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';

type ChatItemPropTypes = {
  isSelf: boolean;
  message: string;
  date: string;
  users: any;
  sid: string;
};

const ChatItem: React.FC<ChatItemPropTypes> = ({ isSelf, message, date, users, sid }) => {
  const { imgUrl, nickname } = useSelector((state: RootState) => state.user);
  const targetNick = isSelf ? nickname : users[sid]?.nickname;
  const targetImg = isSelf ? imgUrl : users[sid]?.imgUrl;
  console.log(targetNick, targetImg);
  console.log(users);
  return (
    <Wrapper isSelf={isSelf}>
      <UserSection isSelf={isSelf}>
        <CircleDiv>{targetImg ? <img src={targetImg} /> : <HumanIcon />}</CircleDiv>
        <NameSpan>{targetNick || 'judangs'}</NameSpan>
        <span>{date}</span>
      </UserSection>
      <MsgContent isSelf={isSelf}>{message}</MsgContent>
    </Wrapper>
  );
};

export default ChatItem;
