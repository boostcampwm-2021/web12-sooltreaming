import React from 'react';
import {
  RequestFriendBtn,
  Friend,
  FriendWrapper,
} from '@components/user-information/FriendList.style';
import { FriendHomeIcon } from '@components/icons';

const FriendList: React.FC = () => {
  return (
    <>
      <FriendWrapper>
        {/* 리스트 형식으로 넣어도 될듯? */}
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
      <RequestFriendBtn />
    </>
  );
};

export default FriendList;
