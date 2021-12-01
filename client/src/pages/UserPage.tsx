import React, { useState, useEffect, useCallback } from 'react';
import { FullScreen, Contents } from '@pages/UserPage.style';
import { useDispatch } from 'react-redux';
import { friendListRequest, sendFriendListRequest, receiveFriendListRequest } from '@store/friend';
import UserHeader from '@components/user-information/UserHeader';
import UserInformation from '@components/user-information';

const UserPage: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState<string>('information');

  const defineMenu = useCallback(
    (menuType) => () => {
      setMenu(menuType);
    },
    [],
  );

  useEffect(() => {
    dispatch(friendListRequest([]));
    dispatch(sendFriendListRequest([]));
    dispatch(receiveFriendListRequest([]));
  }, []);

  return (
    <FullScreen>
      <UserHeader menu={menu} defineMenu={defineMenu} />
      <Contents>
        <UserInformation menu={menu} />
      </Contents>
    </FullScreen>
  );
};

export default UserPage;
