import React, { useEffect, useMemo, useState } from 'react';
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
import { getFriends, getSendFriends, getReceiveFriends } from '@src/api/user';

const Users: React.FC = () => {
  const users = useSelector((state: RootState) => state.room.users);
  const {
    imgUrl: myImgUrl,
    nickname: myNickname,
    id: myId,
  } = useSelector((state: RootState) => state.user);
  const [imPossibleFriends, setImpossibleFriends] = useState<string[]>([]);

  const getImpossibleList = async () => {
    const friends: [] = await getFriends();
    const sendFriends: [] = await getSendFriends();
    const receiveFriends: [] = await getReceiveFriends();
    setImpossibleFriends([...friends, ...sendFriends, ...receiveFriends]);
    console.log('friends :', friends); //아직 ui가 없어 확인용
    console.log('sendFriends :', sendFriends);
    console.log('receiveFriends :', receiveFriends);
  };

  useEffect(() => {
    getImpossibleList();
  }, []);

  return (
    <Wrapper>
      <UserList>
        <ProfileDiv>
          <img src={myImgUrl} />
          <div>{myNickname}</div>
        </ProfileDiv>
      </UserList>
      {Object.values(users)
        .filter(({ id }) => id !== myId)
        .map(({ imgUrl, nickname, id }: UserType) => (
          <UserList key={id}>
            <ProfileDiv>
              <img src={imgUrl} />
              <div>{nickname}</div>
            </ProfileDiv>
            <div>
              <VoteButton>심판</VoteButton>
              {!imPossibleFriends.includes(id) ? <ReqFriendButton>+</ReqFriendButton> : ''}
            </div>
          </UserList>
        ))}
    </Wrapper>
  );
};

export default Users;
