import React, { useState } from 'react';
import Modal from '@components/custom/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { cancelFriendRequest, rejectFriendRequest, acceptFriendRequest } from '@store/friend';

import {
  OpenListButton,
  FriendList,
  AcceptButton,
  DenyButton,
} from '@components/user-information/modals/FriendRequestModal.style';
import { Header, CloseBox } from '@components/user-information/modals/index.style';

import { API } from '@api/index';
import { FriendItem } from '@components/user-information/friend-list/FriendItem';
import { GreenXButtonIcon } from '@src/components/icons';

const FriendRequestModal: React.FC = (): React.ReactElement => {
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
      <OpenListButton onClick={openModal} />
      <Modal
        isOpen={isOpen}
        isRelative={false}
        renderCenter={true}
        absolutePos={{ top: '50%', left: '50%' }}
      >
        <Header>친구 신청 목록</Header>
        <FriendList>
          {sendFriendList.map(({ _id: id, nickname, imgUrl }) => (
            <FriendItem imgUrl={imgUrl} nickname={nickname}>
              <DenyButton onClick={() => cancel(id)}>취소</DenyButton>
            </FriendItem>
          ))}
        </FriendList>
        <Header>친구 요청 목록</Header>
        <FriendList>
          {receiveFriendList.map(({ _id: id, nickname, imgUrl }) => (
            <FriendItem imgUrl={imgUrl} nickname={nickname}>
              <AcceptButton onClick={() => accept({ id, nickname, imgUrl })}>Y</AcceptButton>
              <DenyButton onClick={() => reject(id)}>N</DenyButton>
            </FriendItem>
          ))}
        </FriendList>
        <CloseBox onClick={closeModal}>
          <GreenXButtonIcon />
        </CloseBox>
      </Modal>
    </>
  );
};

export default FriendRequestModal;
