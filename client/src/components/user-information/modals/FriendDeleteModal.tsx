import React, { useState } from 'react';
import {
  DeleteFriendPressSection,
  DeleteIconWrapper,
  CancelIconWrapper,
  ModalContents,
} from '@components/user-information/modals/FriendDeleteModal.style';
import { Header, Button } from '@components/user-information/modals/index.style';
import Modal from '@components/custom/Modal';
import { DeleteIcon, CancelIcon, DeleteFriendIcon } from '@components/icons';
import { API } from '@api/index';
import { useDispatch } from 'react-redux';
import { deleteFriend } from '@store/friend';
import type { FriendDeleteModalPropType } from '@ts-types/components/user-information';

const FriendDeleteModal: React.FC<FriendDeleteModalPropType> = ({
  id,
  nickname,
}): React.ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = () => setIsOpen(false);
  const dispatch = useDispatch();

  const unfriend = async () => {
    const result = await API.call(API.TYPE.PATCH_UNFRIEND, id);
    if (!result) return;
    dispatch(deleteFriend(id));
    closeModal();
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <DeleteFriendIcon />
      </Button>
      <Modal
        isOpen={isOpen}
        isRelative={false}
        renderCenter={true}
        absolutePos={{ top: '50%', left: '50%' }}
      >
        <ModalContents>
          <Header>
            <h2>
              <span>{nickname}</span> 님을 친구 목록에서 삭제하시겠습니까?
            </h2>
          </Header>
          <DeleteFriendPressSection>
            <DeleteIconWrapper onClick={unfriend}>
              <DeleteIcon />
            </DeleteIconWrapper>
            <CancelIconWrapper onClick={closeModal}>
              <CancelIcon />
            </CancelIconWrapper>
          </DeleteFriendPressSection>
        </ModalContents>
      </Modal>
    </>
  );
};

export default FriendDeleteModal;
