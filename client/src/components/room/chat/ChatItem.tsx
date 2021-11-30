import React from 'react';
import { useSelector } from 'react-redux';
import {
  ColumnBox,
  UserContainer,
  ProfileContainer,
  Name,
  MsgContent,
} from '@components/room/chat/ChatItem.style';
import { HumanIcon } from '@components/icons';
import { RootState } from '@src/store';
import type { ChatItemPropType } from '@ts-types/components/room';

const ChatItem: React.FC<ChatItemPropType> = ({
  isSelf,
  message,
  date,
  sid,
}): React.ReactElement => {
  const users = useSelector((state: RootState) => state.room.users);
  const { imgUrl, nickname } = useSelector((state: RootState) => state.user);
  const targetNick = isSelf ? nickname : users[sid]?.nickname;
  const targetImg = isSelf ? imgUrl : users[sid]?.imgUrl;

  return (
    <ColumnBox isSelf={isSelf}>
      <UserContainer isSelf={isSelf}>
        <ProfileContainer>
          {targetImg ? <img src={targetImg} alt="UserProfile" /> : <HumanIcon />}
        </ProfileContainer>
        <Name>{targetNick || 'judangs'}</Name>
        <span>{date}</span>
      </UserContainer>
      <MsgContent isSelf={isSelf}>{message}</MsgContent>
    </ColumnBox>
  );
};

export default React.memo(ChatItem);
