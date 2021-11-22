import { useEffect, useMemo } from 'react';
import Socket from '@socket/socket';
import { useDispatch } from 'react-redux';
import { sendFriendListRequest, receiveFriendListRequest } from '@src/store/friend';
import { requestFriend } from '@src/api/user';
const useRequestFriend = () => {
  const dispatch = useDispatch();

  const updateReceiveFriends = () => {
    dispatch(receiveFriendListRequest([]));
  };

  const onclickRequestFriend = async ({ target }) => {
    const targetData = target.dataset;
    await requestFriend(targetData.uid);
    socket.sendFriendRequest(targetData.sid);

    dispatch(sendFriendListRequest([]));
    dispatch(receiveFriendListRequest([]));
  };
  const socket = useMemo(() => Socket.requestFriend({ updateReceiveFriends }), []);
  useEffect(() => {
    return () => {
      socket.disconnecting();
    };
  }, []);

  return { onclickRequestFriend };
};

export default useRequestFriend;
