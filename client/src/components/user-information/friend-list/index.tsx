import React from 'react';
import { FriendsContainer } from '@components/user-information/friend-list/index.style';

import FriendRequestModal from '@components/user-information/modals/FriendRequestModal';
import FriendInfoModal from '@components/user-information/modals/FriendInfoModal';
import { FriendItem } from '@components/user-information/friend-list/FriendItem';

import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

const FriendList: React.FC = (): React.ReactElement => {
  const friendList = useSelector((state: RootState) => state.friend.friendList);

  return (
    <>
      <FriendsContainer>
        {friendList.map(({ _id: id, imgUrl, nickname }) => (
          <FriendItem imgUrl={imgUrl} nickname={nickname}>
            <FriendInfoModal id={id} imgUrl={imgUrl} nickname={nickname} />
          </FriendItem>
        ))}
      </FriendsContainer>
      <FriendRequestModal />
    </>
  );
};

export default FriendList;
