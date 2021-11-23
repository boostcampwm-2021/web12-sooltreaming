import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import {
  Header,
  DeleteFriendPressSection,
  DeleteIconWrapper,
  CancelIconWrapper,
} from '@components/user-information/Information.style';
import Modal from '@components/custom/Modal';
import { DeleteIcon, CancelIcon } from '@src/components/icons';

type deleteFriendModalType = {
  deleteFriendIsOpen: any;
  toggleFriendJudgment: any;
};

const DeleteFriendModal: React.FC<deleteFriendModalType> = ({
  deleteFriendIsOpen,
  toggleFriendJudgment,
}) => {
  const nickname = useSelector((state: RootState) => state.user.nickname);
  return (
    <Modal
      isOpen={deleteFriendIsOpen}
      isRelative={false}
      renderCenter={true}
      absolutePos={{ top: '50%', left: '50%' }}
    >
      <Header>
        <h2>
          <span>{nickname}</span> 님을 친구 목록에서 삭제하시겠습니까?
        </h2>
      </Header>
      <DeleteFriendPressSection>
        <DeleteIconWrapper onClick={toggleFriendJudgment}>
          <DeleteIcon />
        </DeleteIconWrapper>
        <CancelIconWrapper onClick={toggleFriendJudgment}>
          <CancelIcon />
        </CancelIconWrapper>
      </DeleteFriendPressSection>
    </Modal>
  );
};

export default DeleteFriendModal;
