import React from 'react';
import {
  Wrapper,
  UserList,
  ProfileDiv,
  VoteButton,
  ReqFriendButton,
} from '@src/components/user/Users.style';
import type { UserType } from '@store/user';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';

const Users: React.FC = () => {
  const users = useSelector((state: RootState) => state.room.users);
  return (
    <Wrapper>
      {Object.values(users).map((user: UserType) => (
        <UserList>
          <ProfileDiv>
            <img src={user.imgUrl} />
            <div>{user.nickname}</div>
          </ProfileDiv>
          <div>
            <VoteButton>심판</VoteButton>
            <ReqFriendButton>+</ReqFriendButton>
          </div>
        </UserList>
      ))}
    </Wrapper>
  );
};

export default Users;
