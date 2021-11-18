import { useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setUsers, addUsers, deleteUsers, setHost } from '@store/room';
import { setAudioPower } from '@store/device';
import { setNoticeMessage } from '@store/notice';
import Socket from '@socket/socket';

const useUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => {
    const { id, imgUrl, nickname } = state.user;
    return { id, imgUrl, nickname };
  });
  const code = useSelector((state: RootState) => state.room.roomCode);
  const isVideoOn = useSelector((state: RootState) => state.device.isVideoOn);

  const errorControl = (message) => {
    dispatch(setNoticeMessage({ errorMessage: message }));
    history.push('/');
  };

  const addUser = ({ user, userDevices, sid }) => {
    dispatch(addUsers({ user, userDevices, sid }));
  };

  const deleteUser = (sid) => {
    dispatch(deleteUsers(sid));
  };

  const initUsers = (data) => {
    dispatch(setUsers(data));
  };

  const changeRoomHost = (hostId, isOpen) => {
    dispatch(setHost({ hostId, isOpen }));
  };
  
  const changeAudioPower = ({ isAudioOn }) => {
    dispatch(setAudioPower({ isAudioOn }));
  };

  const socket = useMemo(
    () =>
      Socket.user({
        errorControl,
        addUser,
        deleteUser,
        initUsers,
        changeRoomHost,
        changeAudioPower,
      }),
    [],
  );
  useEffect(() => {
    socket.joinRoom({
      chatRoomCode: code,
      user,
      isVideoOn,
    });
    return () => {
      socket.disconnecting();
    };
  }, []);
  return socket;
};

export default useUser;
