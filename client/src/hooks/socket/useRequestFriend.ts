import { useEffect, useMemo } from 'react';
import Socket from '@socket/socket';
import { useDispatch } from 'react-redux';
import { receiveFriendListRequest, requestFriend } from '@src/store/friend';

const useRequestFriend = () => {
  const dispatch = useDispatch();

  const updateReceiveFriends = () => {
    dispatch(receiveFriendListRequest([]));
  };

  const onclickRequestFriend = ({ target }) => {
    const targetData = target.dataset;
    dispatch(requestFriend(targetData.uid));
    socket.sendFriendRequest(targetData.sid);
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
