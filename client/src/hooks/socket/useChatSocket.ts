import { useMemo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addChatLog } from '@store/room';
import type { ChatLogType } from '@ts-types/store';
import Socket from '@socket/socket';

const useChatSocket = () => {
  const dispatch = useDispatch();
  const addChat = useCallback((data: ChatLogType) => {
    dispatch(addChatLog(data));
  }, []);

  const socket = useMemo(() => {
    return Socket.chat({ addChat });
  }, []);
  useEffect(() => {
    return () => {
      socket.disconnecting();
    };
  }, []);
  return socket;
};

export default useChatSocket;
