import React, { useState } from 'react';
import {
  RequestFriendBtn,
  Friend,
  FriendWrapper,
  RequestData,
  Xbutton,
  PendingFriend,
} from '@components/user-information/FriendList.style';
import {
  FriendHomeIcon,
  SmallAcceptIcon,
  SmallCancelIcon,
  SmallRejectIcon,
} from '@components/icons';
import Modal from '@components/custom/Modal';

const FriendList: React.FC = () => {
  const [friendRequestIsOpen, setFriendRequestIsOpen] = useState<boolean>(false);

  const openFriendRequestJudgment = () => {
    setFriendRequestIsOpen(true);
  };

  const closeFriendRequestJudgment = () => {
    setFriendRequestIsOpen(false);
  };

  return (
    <>
      <FriendWrapper>
        <Friend>
          <div className="left-items">
            <img src="/images/logo.png" alt="프로필사진" />
            <p>pyo-sh</p>
          </div>
          <div className="right-items">
            <FriendHomeIcon />
          </div>
        </Friend>
        <Friend>
          <div className="left-items">
            <img src="/images/logo.png" alt="프로필사진" />
            <p>yeon52</p>
          </div>
          <div className="right-items">
            <FriendHomeIcon />
          </div>
        </Friend>
        <Friend>
          <div className="left-items">
            <img src="/images/logo.png" alt="프로필사진" />
            <p>jyo-jyo</p>
          </div>
          <div className="right-items">
            <FriendHomeIcon />
          </div>
        </Friend>
        <Friend>
          <div className="left-items">
            <img src="/images/logo.png" alt="프로필사진" />
            <p>alittlekitten</p>
          </div>
          <div className="right-items">
            <FriendHomeIcon />
          </div>
        </Friend>
      </FriendWrapper>
      <RequestFriendBtn onClick={openFriendRequestJudgment} />

      <Modal
        isOpen={friendRequestIsOpen}
        isRelative={false}
        renderCenter={true}
        absolutePos={{ top: '50%', left: '50%' }}
      >
        <RequestData>
          <h2>친구 신청 목록</h2>
          <ul className="application draggable-box">
            <li>
              <PendingFriend>
                <div className="left-items">
                  <img src="/images/logo.png" alt="프로필사진" />
                  <p>Crong</p>
                </div>
                <div className="right-items">
                  <SmallCancelIcon />
                </div>
              </PendingFriend>
            </li>
            <li>
              <PendingFriend>
                <div className="left-items">
                  <img src="/images/logo.png" alt="프로필사진" />
                  <p>Honux</p>
                </div>
                <div className="right-items">
                  <SmallCancelIcon />
                </div>
              </PendingFriend>
            </li>
          </ul>
        </RequestData>
        <RequestData>
          <h2>친구 요청 목록</h2>
          <ul className="request draggable-box">
            <li>
              <PendingFriend>
                <div className="left-items">
                  <img src="/images/logo.png" alt="프로필사진" />
                  <p>JK</p>
                </div>
                <div className="right-items">
                  <SmallAcceptIcon />
                  <SmallRejectIcon />
                </div>
              </PendingFriend>
            </li>
          </ul>
        </RequestData>
        <Xbutton onClick={closeFriendRequestJudgment}>
          <img className="xButton" src="/images/xbutton.png" alt="종료버튼" />
        </Xbutton>
      </Modal>
    </>
  );
};

export default FriendList;
