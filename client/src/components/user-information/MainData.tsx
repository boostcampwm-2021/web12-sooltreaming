import React from 'react';
import Information from '@src/components/user-information/Information';
import FriendList from '@src/components/user-information/FriendList';
import Ranking from '@src/components/user-information/Ranking';

type menuType = {
  menu: string;
};

const MainData: React.FunctionComponent<menuType> = ({ menu }) => {
  switch (menu) {
    case 'information':
      return <Information />;
    case 'friendList':
      return <FriendList />;
    case 'ranking':
      return <Ranking />;
  }
  return <></>;
};

export default MainData;
