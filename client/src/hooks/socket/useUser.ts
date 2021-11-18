import { useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setUsers, addUsers, deleteUsers, setHost } from '@store/room';
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
  const userDevices = useSelector((state: RootState) => {
    const { isVideoOn, isAudioOn } = state.device;
    return { isVideoOn, isAudioOn };
  });

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
  
  const socket = useMemo(
    () =>
      Socket.user({
        errorControl,
        addUser,
        deleteUser,
        initUsers,
        changeRoomHost,
      }),
    [],
  );
  useEffect(() => {
    socket.joinRoom({
      chatRoomCode: code,
      user,
      userDevices,
    });
    return () => {
      socket.disconnecting();
    };
  }, []);
  return socket;
};

export default useUser;
