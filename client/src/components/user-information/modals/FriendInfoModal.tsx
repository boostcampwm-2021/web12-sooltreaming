import React, { useState, useEffect } from 'react';
import Modal from '@components/custom/Modal';

import { API } from '@api/index';

import { Xbutton, InfoContainer } from '@components/user-information/FriendList.style';

import NicknameLogModal from '@components/user-information/modals/NicknameLogModal';
import DeleteFriendModal from '@components/user-information/modals/DeleteFriendModal';
import type { NicknameLogType } from '@components/user-information/Information';
import InfoComponent from '@components/user-information/InfoComponent';

const FriendInfoModal = ({ friend, friendInfoIsOpen, closeFriendInfoJudgment, setFriendList }) => {
  const [friendInformation, setFriendInfo] = useState<Object>({});
  const [friendNicknameLog, setFriendNicknameInfo] = useState<Array<NicknameLogType>>([]);

  const [deleteFriendIsOpen, setDeleteFriendIsOpen] = useState<boolean>(false);
  const [historyIsOpen, setHistoryIsOpen] = useState<boolean>(false);

  const { nickname, imgUrl, id } = friend;

  const toggleHistoryJudgment = () => {
    setHistoryIsOpen((prev) => !prev);
  };

  const toggleFriendJudgment = () => {
    setDeleteFriendIsOpen((prev) => !prev);
  };

  const deleteFriend = async () => {
    await API.call(API.TYPE.DELETE_FRIEND, id);
    setFriendList(id);
    closeFriendInfoJudgment();
  };

  useEffect(() => {
    if (!id) return;
    const httpRequest = async () => {
      const { information, nicknameLog } = await API.call(API.TYPE.GET_USER_INFORMATION, id);
      setFriendInfo(information);
      setFriendNicknameInfo(nicknameLog);
    };
    httpRequest();
  }, [friend]);

  return (
    <div>
      <Modal
        isOpen={friendInfoIsOpen}
        isRelative={false}
        renderCenter={true}
        absolutePos={{ top: '50%', left: '50%' }}
      >
        <InfoContainer>
          <InfoComponent
            nickname={nickname}
            imgUrl={imgUrl}
            toggleHistoryJudgment={toggleHistoryJudgment}
            toggleFriendJudgment={toggleFriendJudgment}
            userInformation={friendInformation}
          />
          <Xbutton onClick={closeFriendInfoJudgment}>
            <img className="xButton" src="/images/xbutton.png" alt="종료버튼" />
          </Xbutton>
        </InfoContainer>
      </Modal>

      <DeleteFriendModal
        nickname={nickname}
        deleteFriend={deleteFriend}
        deleteFriendIsOpen={deleteFriendIsOpen}
        toggleFriendJudgment={toggleFriendJudgment}
      />
      <NicknameLogModal
        historyIsOpen={historyIsOpen}
        nickname={nickname}
        nicknameLog={friendNicknameLog}
        toggleHistoryJudgment={toggleHistoryJudgment}
      />
    </div>
  );
};

export default FriendInfoModal;
