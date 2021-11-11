import React from 'react';
import { Wrapper, UserSection, CircleDiv, NameSpan, MsgContent } from './ChatItem.style';
import { HumanIcon } from '@components/icons';
type ChatItemPropTypes = {
  isSelf: boolean;
  message: string;
  date: string;
};

const ChatItem: React.FC<ChatItemPropTypes> = ({ isSelf, message, date }) => {
  console.log(isSelf, message);
  return (
    <Wrapper isSelf={isSelf}>
      <UserSection isSelf={isSelf}>
        <CircleDiv>
          <HumanIcon />
        </CircleDiv>
        <NameSpan>{undefined || 'judangs'}</NameSpan>
        <span>{date}</span>
      </UserSection>
      <MsgContent isSelf={isSelf}>{message}</MsgContent>
    </Wrapper>
  );
};

export default ChatItem;
