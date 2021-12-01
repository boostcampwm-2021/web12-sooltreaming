import React, { useState } from 'react';
import {
  HomeButton,
  ModalContents,
} from '@components/user-information/modals/FriendInfoModal.style';
import { CloseBox } from '@components/user-information/modals/index.style';
import Modal from '@components/custom/Modal';
import Information from '@components/user-information/information/';
import { HomeIcon, GreenXButtonIcon } from '@components/icons';
import type { FriendInfoModalPropType } from '@ts-types/components/user-information';

const FriendInfoModal: React.FC<FriendInfoModalPropType> = ({
  id,
  nickname,
  imgUrl,
}): React.ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <HomeButton onClick={openModal}>
        <HomeIcon />
      </HomeButton>
      <Modal
        isOpen={isOpen}
        isRelative={false}
        renderCenter={true}
        absolutePos={{ top: '50%', left: '50%' }}
      >
        <ModalContents>
          <Information id={id} nickname={nickname} imgUrl={imgUrl} />
          <CloseBox onClick={closeModal}>
            <GreenXButtonIcon />
          </CloseBox>
        </ModalContents>
      </Modal>
    </>
  );
};

export default FriendInfoModal;
