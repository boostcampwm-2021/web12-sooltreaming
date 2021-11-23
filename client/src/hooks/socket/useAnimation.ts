import { useMemo, useCallback, useEffect } from 'react';
import Socket from '@socket/socket';
import { useDispatch } from 'react-redux';
import { setIsCheers, setCloseUpUser, resetRoomInfo } from '@store/room';

const useAnimation = () => {
  const dispatch = useDispatch();

  const updateCheers = useCallback((data) => {
    dispatch(setIsCheers(data));
  }, []);

  const updateCloseUpUser = useCallback((data) => {
    dispatch(setCloseUpUser(data));
  }, []);

  const closeup = (e) => {
    if (closeupUser) {
      deactivateCloseup.current();
    } else {
      activateCloseup.current();
    }
  };
  const socket = useMemo(() => Socket.animation({ updateCheers, setCloseupUser }), []);
  useEffect(() => {
    return () => {
      socket.disconnecting();
      dispatch(resetRoomInfo({}));
    };
  }, []);

  return socket;
};

export default useAnimation;
