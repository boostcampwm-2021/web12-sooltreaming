import { useEffect, useState } from 'react';
import Modal from '@components/custom/Modal';

import { API } from '@api/index';

import { RequestData, Xbutton } from '@components/user-information/FriendList.style';
import { FriendItem } from '@components/user-information/FriendItem';

import { useDispatch } from 'react-redux';
import { friendListRequest } from '@src/store/friend';

type FriendType = {
  _id: string;
  nickname: string;
  imgUrl: string;
};

const FriendRequestModal = ({ friendRequestIsOpen, closeFriendRequestJudgment }) => {
  const dispatch = useDispatch();
  const [sendFriend, setSendFriend] = useState<Array<FriendType>>([]);
  const [receiveFriend, setReceiveFriend] = useState<Array<FriendType>>([]);

  const cancleFriendRequest = async (id) => {
    await API.call(API.TYPE.DELETE_SENDFRIEND, id);
    setSendFriend((prev) => [...prev].filter((friend) => friend._id !== id));
  };

  const rejectFriendRequest = async (id) => {
    await API.call(API.TYPE.DELETE_RECEIVEFRIEND, id);
    setReceiveFriend((prev) => [...prev].filter((friend) => friend._id !== id));
  };

  const acceptFriendRequest = async (id) => {
    await API.call(API.TYPE.PATCH_RECEIVEREIEND, id);
    setReceiveFriend((prev) => [...prev].filter((friend) => friend._id !== id));
    dispatch(friendListRequest([]));
  };

  useEffect(() => {
    const httpRequest = async () => {
      const sendList = await API.call(API.TYPE.GET_SENDFRIEND);
      const receiveList = await API.call(API.TYPE.GET_RECEIVEFRIEND);
      setSendFriend(sendList);
      setReceiveFriend(receiveList);
    };
    httpRequest();
  }, []);

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
            {sendFriend.map(({ _id: id, nickname, imgUrl }) => (
              <li>
                <FriendItem imgUrl={imgUrl} nickname={nickname}>
                  <button
                    className="cancle-button"
                    onClick={() => {
                      cancleFriendRequest(id);
                    }}
                  >
                    취소
                  </button>
                </FriendItem>
              </li>
            ))}
          </ul>
        </RequestData>
        <RequestData>
          <h2>친구 요청 목록</h2>
          <ul className="request draggable-box">
            {receiveFriend.map(({ _id: id, nickname, imgUrl }) => (
              <li>
                <FriendItem imgUrl={imgUrl} nickname={nickname}>
                  <button
                    className="add-button"
                    onClick={() => {
                      acceptFriendRequest(id);
                    }}
                  >
                    수락
                  </button>
                  <button
                    className="cancle-button"
                    onClick={() => {
                      rejectFriendRequest(id);
                    }}
                  >
                    거절
                  </button>
                </FriendItem>
              </li>
            ))}
          </ul>
        </RequestData>
        <Xbutton onClick={closeFriendRequestJudgment}>
          <img className="xButton" src="/images/xbutton.png" alt="종료버튼" />
        </Xbutton>
      </Modal>
    </div>
  );
};

export default FriendRequestModal;
