import React from 'react';
import {
  Wrapper,
  UserList,
  ProfileDiv,
  VoteButton,
  ReqFriendButton,
} from '@src/components/user/Users.style';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { useDispatch } from 'react-redux';
import useRequestFriend from '@hooks/socket/useRequestFriend';
import Socket from '@socket/socket';

type UsersPropTypes = {
  startVoteRef: React.MutableRefObject<Function>;
};

const Users: React.FC<UsersPropTypes> = ({ startVoteRef }) => {
  const dispatch = useDispatch();
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

  const { onclickRequestFriend } = useRequestFriend();
  return (
    <Wrapper>
      <UserList>
        <ProfileDiv>
          <img src={myImgUrl} />
          <div>{myNickname}</div>
        </ProfileDiv>
      </UserList>
      {Object.entries(users)
        .filter(([key]) => key !== Socket.getSID())
        .map(([key, { imgUrl, nickname, id }]) => (
          <UserList key={id}>
            <ProfileDiv>
              <img src={imgUrl} />
              <div>{nickname}</div>
            </ProfileDiv>
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
    </Wrapper>
  );
};

export default Users;
