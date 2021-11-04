import React from 'react';
import { Wrapper, UserSection, CircleDiv, NameSpan, MsgContent } from './ChatItem.style';

type ChatItemPropTypes = {
  isSelf: boolean;
  message: string;
  date: string;
};

const ChatItem: React.FC<ChatItemPropTypes> = ({ isSelf, message, date }) => {
  return (
    <Wrapper isSelf={isSelf}>
      <UserSection isSelf={isSelf}>
        <CircleDiv>
          <img src={undefined || '/images/human.svg'} alt="User-Image" />
        </CircleDiv>
        <NameSpan>{undefined || 'judangs'}</NameSpan>
        <span>{date}</span>
      </UserSection>
      <MsgContent isSelf={isSelf}>{message}</MsgContent>
    </Wrapper>
  );
};

export default ChatItem;
