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
import { useDispatch } from 'react-redux';
import { requestFriend } from '@src/store/friend';
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
  });

  const onclickRequestFriend = ({ target }) => {
    dispatch(requestFriend(target.dataset.id));
    //소켓으로 상대방한테 보냈다고 알림
    //상대방은 친구신청 받으면 바로 receiveFriendList 갱신 -> 리렌더
  };

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
              <VoteButton
                onClick={() => {
                  console.log(startVoteRef.current);
                  (startVoteRef?.current ?? (() => {}))(key);
                }}
              >
                심판
              </VoteButton>
              {!imPossibleFriends.includes(id) && id !== myId ? (
                <ReqFriendButton onClick={onclickRequestFriend} data-id={id}>
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
