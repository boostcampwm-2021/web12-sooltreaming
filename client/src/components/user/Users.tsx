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
import useFriendSocket from '@src/hooks/socket/useFriendSocket';
import Socket from '@socket/socket';

type UsersPropTypes = {
  startVoteRef: React.MutableRefObject<Function>;
};

const Users: React.FC<UsersPropTypes> = ({ startVoteRef }) => {
  const users = useSelector((state: RootState) => state.room.users);
  const { friendList, sendFriendList, receiveFriendList } = useSelector(
    (state: RootState) => state.friend,
  );
  const {
    imgUrl: myImgUrl,
    nickname: myNickname,
    id: myId,
  } = useSelector((state: RootState) => state.user);
  const imPossibleFriends = [...friendList, ...sendFriendList, ...receiveFriendList];

  const { onclickRequestFriend } = useFriendSocket();
  return (
    <MenuBox>
      <UserList>
        <Profile>
          <img src={myImgUrl} />
          <div>{myNickname}</div>
        </Profile>
      </UserList>
      {Object.entries(users)
        .filter(([key]) => key !== Socket.getSID())
        .map(([key, { imgUrl, nickname, id }]) => (
          <UserList key={id}>
            <Profile>
              <img src={imgUrl} />
              <div>{nickname}</div>
            </Profile>
            <div>
              <VoteButton onClick={() => (startVoteRef?.current ?? (() => {}))(key)}>
                심판
              </VoteButton>
              {!imPossibleFriends.includes(id) && id !== myId ? (
                <ReqFriendButton onClick={onclickRequestFriend} data-uid={id} data-sid={key}>
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
