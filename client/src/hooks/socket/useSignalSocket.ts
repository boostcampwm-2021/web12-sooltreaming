import { useEffect, useMemo } from 'react';
import Socket from '@socket/socket';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { addStreams } from '@store/room';

const useSignalSocket = () => {
  const dispatch = useDispatch();
  const streams = useSelector((state: RootState) => state.room.streams);
  const stream = useSelector((state: RootState) => state.device.stream);

  const addStream = (sid) => (e) => {
    if (streams[sid]) return;
    dispatch(addStreams({ sid, stream: e.stream }));
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
