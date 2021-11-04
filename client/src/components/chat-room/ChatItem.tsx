import React from 'react';
import {
  ChatItemWrapper,
  ChatItemUserInfo,
  ChatItemImage,
  ChatItemUserId,
  ChatItemMessage,
} from './ChatItem.style';

type ChatItemPropTypes = {
  isSelf: boolean;
  message: string;
  date: string;
};

const ChatItem: React.FC<ChatItemPropTypes> = ({ isSelf, message, date }) => {
  return (
    <ChatItemWrapper isSelf={isSelf}>
      <ChatItemUserInfo isSelf={isSelf}>
        <ChatItemImage>
          <img src={undefined || '/images/human.svg'} alt="User-Image" />
        </ChatItemImage>
        <ChatItemUserId>{undefined || 'judangs'}</ChatItemUserId>
        <span>{date}</span>
      </ChatItemUserInfo>
      <ChatItemMessage isSelf={isSelf}>{message}</ChatItemMessage>
    </ChatItemWrapper>
  );
};

export default ChatItem;
