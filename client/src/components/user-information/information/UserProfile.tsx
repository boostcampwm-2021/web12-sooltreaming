import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import {
  ProfileBox,
  ImageBox,
  Contents,
  Nickname,
  ButtonsContainer,
} from '@components/user-information/information/UserProfile.style';
import NickLogModal from '@components/user-information/modals/NickLogModal';
import NickChangeModal from '@components/user-information/modals/NickChangeModal';
import FriendDeleteModal from '@components/user-information/modals/FriendDeleteModal';
import type { UserProfilePropType } from '@ts-types/components/user-information';

const UserProfile: React.FC<UserProfilePropType> = ({
  id,
  imgUrl,
  nickname,
  nicknameLog,
}): React.ReactElement => {
  const myID = useSelector((state: RootState) => state.user.id);

  return (
    <ProfileBox>
      <ImageBox>
        <img src={imgUrl} alt="프로필" />
      </ImageBox>
      <Contents>
        <Nickname>{nickname}</Nickname>
        <ButtonsContainer>
          <NickLogModal nickname={nickname} nicknameLog={nicknameLog} />
          {id === myID && <NickChangeModal />}
          {id !== myID && <FriendDeleteModal id={id} nickname={nickname} />}
        </ButtonsContainer>
      </Contents>
    </ProfileBox>
  );
};

export default UserProfile;
