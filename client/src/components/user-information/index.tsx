import React from 'react';
import Information from '@components/user-information/information';
import FriendList from '@components/user-information/friend-list';
import Ranks from '@components/user-information/ranks';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';

type menuType = {
  menu: string;
};

const UserInformation: React.FunctionComponent<menuType> = ({ menu }) => {
  const { id, imgUrl, nickname } = useSelector((state: RootState) => state.user);

  switch (menu) {
    case 'information':
      return <Information id={id} nickname={nickname} imgUrl={imgUrl} />;
    case 'friendList':
      return <FriendList />;
    case 'ranking':
      return <Ranks />;
  }
  return <></>;
};

export default UserInformation;
