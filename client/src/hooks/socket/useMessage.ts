import { useMemo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addChatLog } from '@store/room';
import type { ChatLogType } from '@store/room';
import Socket from '@socket/socket';

const useMessage = () => {
  const dispatch = useDispatch();
  const addChat = useCallback((data: ChatLogType) => {
    dispatch(addChatLog(data));
  }, []);

  const socket = useMemo(() => {
    return Socket.message({ addChat });
  }, []);
  useEffect(() => {
    return () => {
      socket.disconnecting();
    };
  }, []);
  return socket;
};

export default useMessage;
