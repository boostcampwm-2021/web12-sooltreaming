import { useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setUsers, addUsers, deleteUsers, setHost } from '@store/room';
import { setNoticeMessage } from '@store/notice';
import {
  friendListRequest,
  sendFriendListRequest,
  receiveFriendListRequest,
} from '@src/store/friend';

import Socket from '@socket/socket';

const useEnterSocket = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, imgUrl, nickname } = useSelector((state: RootState) => state.user);
  const user = { id, imgUrl, nickname };
  const code = useSelector((state: RootState) => state.room.roomCode);
  const isVideoOn = useSelector((state: RootState) => state.device.isVideoOn);
  const isAudioOn = useSelector((state: RootState) => state.device.isAudioOn);

  const errorControl = (message) => {
    dispatch(setNoticeMessage({ errorMessage: message }));
    history.push('/');
  };

  const addUser = ({ user, userDevices: newUserDevices, sid }) => {
    dispatch(addUsers({ user, userDevices: newUserDevices, sid }));
  };

  const deleteUser = (sid) => {
    dispatch(deleteUsers(sid));
  };

  const initUsers = (data) => {
    dispatch(setUsers(data));
  };

  const changeRoomHost = (isOpen) => {
    dispatch(setHost({ hostSID: Socket.getSID(), isOpen }));
  };

  const updateFriendList = () => {
    dispatch(friendListRequest([]));
    dispatch(sendFriendListRequest([]));
    dispatch(receiveFriendListRequest([]));
  };

  const socket = useMemo(
    () =>
      Socket.enter({
        errorControl,
        addUser,
        deleteUser,
        initUsers,
        changeRoomHost,
        updateFriendList,
      }),
    [],
  );
  useEffect(() => {
    socket.joinRoom({
      chatRoomCode: code,
      user,
      userDevices: {
        isVideoOn,
        isAudioOn,
      },
    });
    return () => {
      socket.disconnecting();
    };
  }, []);
  return socket;
};

export default useEnterSocket;
