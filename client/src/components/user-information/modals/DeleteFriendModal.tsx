import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { Header, DeleteChangePressSection } from '@components/user-information/Information.style';
import Modal from '@components/custom/Modal';

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
      <DeleteChangePressSection>
        <button onClick={toggleFriendJudgment}>
          <img src="/images/agree.png" alt="agree" />
        </button>
        <button onClick={toggleFriendJudgment}>
          <img src="/images/disagree.png" alt="disagree" />
        </button>
      </DeleteChangePressSection>
    </Modal>
  );
};

export default DeleteFriendModal;
