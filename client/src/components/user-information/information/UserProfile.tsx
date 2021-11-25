import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import {
  ProfileContainer,
  ProfileBox,
  ImgSlot,
  Contents,
  ButtonsContainer,
} from '@components/user-information/information/UserProfile.style';
import NickLogModal from '@components/user-information/modals/NickLogModal';
import NickChangeModal from '@components/user-information/modals/NickChangeModal';
import FriendDeleteModal from '@components/user-information/modals/FriendDeleteModal';

type UserProfilePropTypes = {
  id: string;
  imgUrl: string;
  nickname: string;
  nicknameLog: any[];
};

const UserProfile: React.FC<UserProfilePropTypes> = ({ id, imgUrl, nickname, nicknameLog }) => {
  const myID = useSelector((state: RootState) => state.user.id);

  return (
    <ProfileContainer>
      <ProfileBox>
        <ImgSlot>
          <img src={imgUrl} alt="프로필" />
        </ImgSlot>
        <Contents>
          <p>{nickname}</p>
          <ButtonsContainer>
            {/* 닉네임 로그 받아서 아래로 뿌려주기 */}
            <NickLogModal nickname={nickname} nicknameLog={nicknameLog} />
            {id === myID && <NickChangeModal />}
            {id !== myID && <FriendDeleteModal id={id} nickname={nickname} />}
          </ButtonsContainer>
        </Contents>
      </ProfileBox>
    </ProfileContainer>
  );
};

export default UserProfile;
