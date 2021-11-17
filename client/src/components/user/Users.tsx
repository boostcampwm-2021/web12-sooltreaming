import React from 'react';
import {
  Wrapper,
  UserList,
  ProfileDiv,
  VoteButton,
  ReqFriendButton,
} from '@src/components/user/Users.style';
import type { UserType } from '@store/user';

type UsersPropTypes = {
  users: { [key: string]: UserType };
};

const Users: React.FC<UsersPropTypes> = ({ users }) => {
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
