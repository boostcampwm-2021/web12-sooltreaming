import { useEffect, useMemo } from 'react';
import Socket from '@socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { sendFriendRequest, receiveFriendRequest } from '@store/friend';
import { API } from '@api/index';

const useFriendSocket = () => {
  const dispatch = useDispatch();
  const {
    id: myId,
    imgUrl: myImgUrl,
    nickname: myNickname,
  } = useSelector((state: RootState) => state.user);

  const updateReceiveFriends = ({ id, imgUrl, nickname }) => {
    dispatch(receiveFriendRequest({ _id: id, imgUrl, nickname }));
  };

  const onclickRequestFriend = async ({ sid, id, imgUrl, nickname }) => {
    const result = await API.call(API.TYPE.POST_FRIEND, id);
    if (!result) return;
    socket.sendFriendRequest({ sid, id: myId, imgUrl: myImgUrl, nickname: myNickname });

    dispatch(sendFriendRequest({ _id: id, imgUrl, nickname }));
  };

  const socket = useMemo(() => Socket.friend({ updateReceiveFriends }), []);
  useEffect(() => {
    return () => {
      socket.disconnecting();
    };
  }, []);

  return { onclickRequestFriend };
};

export default useFriendSocket;
