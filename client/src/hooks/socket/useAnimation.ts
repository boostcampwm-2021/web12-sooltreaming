import { useMemo, useCallback, useEffect, useRef, useState } from 'react';
import Socket from '@socket/socket';
import { useDispatch } from 'react-redux';
import { setIsCheers, setCloseUpUser, resetRoomInfo } from '@store/room';
import { RootState } from '@src/store';

const useAnimation = () => {
  const dispatch = useDispatch();
  const [closeupUser, setCloseupUser] = useState<string>('');

  const updateCheers = useCallback((data) => {
    dispatch(setIsCheers(data));
  }, []);

  const updateCloseUpUser = useCallback((data) => {
    dispatch(setCloseUpUser(data));
  }, []);

  // const closeup = (e) => {
  //   if (closeupUser) {
  //     deactivateCloseup.current();
  //   } else {
  //     console.log(e);
  //     activateCloseup.current();
  //   }
  // };
  const socket = useMemo(() => Socket.animation({ updateCheers, updateCloseUpUser }), []);
  useEffect(() => {
    // activateCheers.current = socket.activateCheers;
    // activateCloseup.current = socket.activateCloseup;
    // deactivateCloseup.current = socket.deactivateCloseup;

    return () => {
      socket.disconnecting();
      dispatch(resetRoomInfo({}));
    };
  }, []);

  return socket;
};

export default useAnimation;
