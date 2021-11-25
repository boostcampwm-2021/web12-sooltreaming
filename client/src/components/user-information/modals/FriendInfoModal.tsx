import React, { useState } from 'react';
import {
  HomeButton,
  ModalContents,
} from '@components/user-information/modals/FriendInfoModal.style';
import { CloseBox } from '@components/user-information/modals/index.style';
import Modal from '@components/custom/Modal';
import Information from '@components/user-information/information/';
import { HomeIcon, GreenXButtonIcon } from '@components/icons';

type FriendInfoModalPropTypes = {
  id: string;
  nickname: string;
  imgUrl: string;
};

const FriendInfoModal: React.FC<FriendInfoModalPropTypes> = ({ id, nickname, imgUrl }) => {
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
