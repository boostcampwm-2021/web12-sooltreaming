import React, { useState, useEffect } from 'react';
import {
  RequestFriendBtn,
  FriendWrapper,
} from '@components/user-information/FriendList.style';
import {
  HomeIcon,
} from '@components/icons';

import { API } from '@api/index';
import FriendRequestModal from '@components/user-information/modals/FriendRequestModal';
import FriendInfoModal from '@components/user-information/modals/FriendInfoModal';
import { FriendItem } from '@components/user-information/FriendItem';


const FriendList: React.FC = () => {
  const [friendList, setFriendList] = useState([]);
  const [friendRequestIsOpen, setFriendRequestIsOpen] = useState<boolean>(false);
  const [friendInfoIsOpen, setFriendInfoIsOpen] = useState<boolean>(false);

  const [selectedFriend, setSelectedFriend] = useState({});

  const openFriendRequestJudgment = () => {
    setFriendRequestIsOpen(true);
  };

  const closeFriendRequestJudgment = () => {
    setFriendRequestIsOpen(false);
  };

  const openFriendInfoJudgment = (user) => {
    setSelectedFriend(user);
    setFriendInfoIsOpen(true);
  };

  const closeFriendInfoJudgment = () => {
    setFriendInfoIsOpen(false);
  };

  const deleteFriend = (targetId) => {
    setFriendList((prev) => [...prev].filter(({_id: id}) => targetId !== id));
  }

  useEffect(() => {
    const httpRequest = async () => {
      const result = await API.call(API.TYPE.GET_FRIEND);
      setFriendList(result);
    }
    httpRequest();
  }, [])

  return (
    <>
      <FriendWrapper>
        {friendList.map(({_id: id, imgUrl, nickname}) => 
          <FriendItem imgUrl={imgUrl} nickname={nickname}>
            <button className='home-button' onClick={() => {openFriendInfoJudgment({id, imgUrl, nickname});}}>
              <HomeIcon />
            </button>
          </FriendItem>
        )}
      </FriendWrapper>
      <RequestFriendBtn onClick={openFriendRequestJudgment} />
      <FriendRequestModal friendRequestIsOpen={friendRequestIsOpen} closeFriendRequestJudgment={closeFriendRequestJudgment}/>
      <FriendInfoModal setFriendList={deleteFriend} friend={selectedFriend} friendInfoIsOpen={friendInfoIsOpen} closeFriendInfoJudgment={closeFriendInfoJudgment}/>
    </>
  );
};

export default FriendList;
