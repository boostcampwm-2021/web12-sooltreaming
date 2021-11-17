import { useMemo, useCallback, useEffect, useRef, useState } from 'react';
import Socket from '@socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCheers, resetRoomInfo } from '@store/room';
import { RootState } from '@src/store';

const useAnimation = () => {
  const dispatch = useDispatch();
  const activateCheers = useRef<any>(() => {});
  const activateCloseup = useRef<any>(() => {});
  const deactivateCloseup = useRef<any>(() => {});
  const [closeupUser, setCloseupUser] = useState<string>('');
  const user = useSelector((state: RootState) => state.user);
  const isCheers = useSelector((state: RootState) => state.room.isCheers);

  const updateCheers = useCallback((data) => {
    dispatch(setIsCheers(data));
  }, []);

  const cheers = (e) => {
    if (isCheers) return;
    activateCheers.current({
      user,
    });
  };

  const closeup = (e) => {
    if (closeupUser) {
      deactivateCloseup.current();
    } else {
      console.log(e);
      activateCloseup.current();
    }
  };
  const socket = useMemo(() => Socket.animation({ updateCheers, setCloseupUser }), []);
  useEffect(() => {
    activateCheers.current = socket.activateCheers;
    activateCloseup.current = socket.activateCloseup;
    deactivateCloseup.current = socket.deactivateCloseup;

    return () => {
      socket.disconnecting();
      dispatch(resetRoomInfo({}));
    };
  }, []);

  return {
    cheers,
    closeup,
    closeupUser,
  };
};

export default useAnimation;
