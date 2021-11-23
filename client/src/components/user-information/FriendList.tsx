import React, { useState, useEffect } from 'react';
import {
  RequestFriendBtn,
  FriendWrapper,
} from '@components/user-information/FriendList.style';
import {
  HomeIcon,
} from '@components/icons';

import { API } from '@api/index';
import FriendRequestModal from '@components/user-information//modals/FriendRequestModal';
import { FriendItem } from '@components/user-information/FriendItem';


const FriendList: React.FC = () => {
  const [friendList, setFriendList] = useState([]);
  const [friendRequestIsOpen, setFriendRequestIsOpen] = useState<boolean>(false);

  const openFriendRequestJudgment = () => {
    setFriendRequestIsOpen(true);
  };

  const closeFriendRequestJudgment = () => {
    setFriendRequestIsOpen(false);
  };

  return (
    <>
      <FriendWrapper>
      </FriendWrapper>
      <RequestFriendBtn onClick={openFriendRequestJudgment} />
      <FriendRequestModal friendRequestIsOpen={friendRequestIsOpen} closeFriendRequestJudgment={closeFriendRequestJudgment}/>
    </>
  );
};

export default FriendList;
