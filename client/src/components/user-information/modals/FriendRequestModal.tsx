import React, { useEffect, useState, useCallback } from 'react';
import Modal from '@components/custom/Modal';

import { API } from '@api/index';

import {RequestData, Xbutton} from '@components/user-information/FriendList.style'
import { FriendItem } from '@components/user-information/FriendItem';

type FriendType = {
  _id: string;
  nickname: string;
  imgUrl: string;
}

const FriendRequestModal = ({friendRequestIsOpen, closeFriendRequestJudgment}) => {
  const [sendFriend, setSendFriend] = useState<Array<FriendType>>([]);
  const [receiveFriend, setReceiveFriend] = useState<Array<FriendType>>([]);

  const cancleFriendRequest = async (id) => {
  }

  const rejectFriendRequest = async (id) => {
  }

  const acceptFriendRequest = async (id) => {
  }
  

  return (
    <div>
      <Modal
        isOpen={friendRequestIsOpen}
        isRelative={false}
        renderCenter={true}
        absolutePos={{ top: '50%', left: '50%' }}
      >
        <RequestData>
          <h2>친구 신청 목록</h2>
          <ul className="application draggable-box">
          </ul>
        </RequestData>
        <RequestData>
          <h2>친구 요청 목록</h2>
          <ul className="request draggable-box">
          </ul>
        </RequestData>
        <Xbutton onClick={closeFriendRequestJudgment}>
          <img className="xButton" src="/images/xbutton.png" alt="종료버튼" />
        </Xbutton>
      </Modal>
    </div>
  )
}

export default FriendRequestModal
