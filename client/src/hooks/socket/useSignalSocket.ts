import { useEffect, useMemo } from 'react';
import Socket from '@socket/socket';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { addStreams } from '@store/room';

const useSignalSocket = () => {
  const dispatch = useDispatch();
  const stream = useSelector((state: RootState) => state.device.stream);

  const addStream = (sid) => (stream) => {
    dispatch(addStreams({ sid, stream }));
  };

  const socket = useMemo(() => Socket.signal({ addStream, stream }), []);
  useEffect(() => {
    return () => {
      socket.disconnecting();
    };
  }, []);
  return socket;
};

export default useSignalSocket;
