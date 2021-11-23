import { useMemo, useCallback, useEffect } from 'react';
import Socket from '@socket/socket';
import { useDispatch } from 'react-redux';
import { setIsCheers, setCloseUpUser, resetRoomInfo } from '@store/room';

const useAnimationSocket = () => {
  const dispatch = useDispatch();

  const updateCheers = useCallback((data) => {
    dispatch(setIsCheers(data));
  }, []);

  const updateCloseUpUser = useCallback((data) => {
    dispatch(setCloseUpUser(data));
  }, []);

  const socket = useMemo(() => Socket.animation({ updateCheers, updateCloseUpUser }), []);
  useEffect(() => {
    return () => {
      socket.disconnecting();
      dispatch(resetRoomInfo({}));
    };
  }, []);

  return socket;
};

export default useAnimationSocket;
