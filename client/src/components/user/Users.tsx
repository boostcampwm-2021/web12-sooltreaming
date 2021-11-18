import React, { useEffect } from 'react';
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

  useEffect(() => {
    console.log('friends :', friendList); //아직 ui가 없어 확인용
    console.log('sendFriends :', sendFriendList);
    console.log('receiveFriends :', receiveFriendList);
  }, [friendList, sendFriendList, receiveFriendList]);
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
