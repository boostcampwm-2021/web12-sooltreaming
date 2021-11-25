import React, { useState } from 'react';
import Modal from '@components/custom/Modal';

import { RequestFriendBtn } from '@components/user-information/modals/FriendRequestModal.style';

import { API } from '@api/index';

import { CloseBox } from '@components/user-information/modals/index.style';
import { RequestData } from '@components/user-information/friend-list/index.style';
import { FriendItem } from '@components/user-information/friend-list/FriendItem';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { GreenXButtonIcon } from '@src/components/icons';
import { cancelFriendRequest, rejectFriendRequest, acceptFriendRequest } from '@store/friend';

const FriendRequestModal = () => {
  const dispatch = useDispatch();
  const { sendFriendList, receiveFriendList } = useSelector((state: RootState) => state.friend);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const cancel = async (id) => {
    await API.call(API.TYPE.PATCH_SEND_FRIEND, id);
    dispatch(cancelFriendRequest(id));
  };

  const reject = async (id) => {
    await API.call(API.TYPE.PATCH_RECEIVE_FRIEND, id);
    dispatch(rejectFriendRequest(id));
  };

  const accept = async ({ id, nickname, imgUrl }) => {
    await API.call(API.TYPE.PATCH_FRIEND, id);
    dispatch(acceptFriendRequest({ _id: id, nickname, imgUrl }));
  };

  return (
    <>
      <RequestFriendBtn onClick={openModal} />
      <Modal
        isOpen={isOpen}
        isRelative={false}
        renderCenter={true}
        absolutePos={{ top: '50%', left: '50%' }}
      >
        <RequestData>
          <h2>친구 신청 목록</h2>
          <ul className="application draggable-box">
            {sendFriendList.map(({ _id: id, nickname, imgUrl }) => (
              <li>
                <FriendItem imgUrl={imgUrl} nickname={nickname}>
                  <button
                    className="cancel-button"
                    onClick={() => {
                      cancel(id);
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
            {receiveFriendList.map(({ _id: id, nickname, imgUrl }) => (
              <li>
                <FriendItem imgUrl={imgUrl} nickname={nickname}>
                  <button
                    className="add-button"
                    onClick={() => {
                      accept({ id, nickname, imgUrl });
                    }}
                  >
                    수락
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => {
                      reject(id);
                    }}
                  >
                    거절
                  </button>
                </FriendItem>
              </li>
            ))}
          </ul>
        </RequestData>
        <CloseBox onClick={closeModal}>
          <GreenXButtonIcon />
        </CloseBox>
      </Modal>
    </>
  );
};

export default FriendRequestModal;
