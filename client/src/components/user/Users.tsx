import React from 'react';
import {
  MenuBox,
  UserList,
  Profile,
  VoteButton,
  ReqFriendButton,
} from '@src/components/user/Users.style';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import Socket from '@socket/socket';
import type { UsersPropType } from '@ts-types/components/user';

const Users: React.FC<UsersPropType> = ({
  startVoteRef,
  onclickRequestFriend,
}): React.ReactElement => {
  const users = useSelector((state: RootState) => state.room.users);

  const { friendList, sendFriendList, receiveFriendList } = useSelector(
    (state: RootState) => state.friend,
  );

  const friendListId = Object.values(friendList).map(({ _id }) => _id);
  const sendFriendListId = Object.values(sendFriendList).map(({ _id }) => _id);
  const receiveFriendListId = Object.values(receiveFriendList).map(({ _id }) => _id);

  const {
    imgUrl: myImgUrl,
    nickname: myNickname,
    id: myId,
  } = useSelector((state: RootState) => state.user);
  const imPossibleFriends = [...friendListId, ...sendFriendListId, ...receiveFriendListId];
  return (
    <MenuBox>
      <UserList>
        <Profile>
          <img src={myImgUrl} alt="내 프로필" />
          <div>{myNickname}</div>
        </Profile>
      </UserList>
      {Object.entries(users)
        .filter(([key]) => key !== Socket.getSID())
        .map(([key, { imgUrl, nickname, id }]) => (
          <UserList key={id}>
            <Profile>
              <img src={imgUrl} alt="다른 사람 프로필" />
              <div>{nickname}</div>
            </Profile>
            <div>
              <VoteButton onClick={() => (startVoteRef?.current ?? (() => {}))(key)}>
                심판
              </VoteButton>
              {!imPossibleFriends.includes(id) && id !== myId ? (
                <ReqFriendButton
                  onClick={() => onclickRequestFriend({ imgUrl, nickname, id, sid: key })}
                >
                  +
                </ReqFriendButton>
              ) : (
                ''
              )}
            </div>
          </UserList>
        ))}
    </MenuBox>
  );
};

export default Users;
