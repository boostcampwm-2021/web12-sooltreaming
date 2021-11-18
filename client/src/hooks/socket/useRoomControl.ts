import { useMemo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { toggleIsOpen } from '@store/room';
import { setNoticeMessage } from '@store/notice';

import Socket from '@socket/socket';

const useRoomControl = () => {
  const dispatch = useDispatch();

  const errorControl = useCallback((message) => {
    dispatch(setNoticeMessage({ errorMessage: message }));
  }, []);

  const changeIsOpen = useCallback(() => {
    dispatch(toggleIsOpen({}));
  }, []);

  const socket = useMemo(
    () =>
      Socket.roomControl({
        errorControl,
        changeIsOpen,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      socket.disconnecting();
    };
  }, []);

  return socket;
};

export default useRoomControl;
