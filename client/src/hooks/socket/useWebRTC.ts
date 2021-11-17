import { useEffect, useMemo } from 'react';
import Socket from '@socket/socket';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { addStreams } from '@store/room';

const useWebRTC = () => {
  const dispatch = useDispatch();
  const streams = useSelector((state: RootState) => state.room.streams);
  const stream = useSelector((state: RootState) => state.device.stream);

  const addStream = (sid, stream) => {
    if (streams[sid]) return;
    dispatch(addStreams({ sid, stream }));
  };

  const socket = useMemo(() => Socket.webRTC({ addStream, stream }), []);
  useEffect(() => {
    // Socket으로 Peer Connection 만들기
    return () => {
      socket.disconnecting();
    };
  }, []);
  return socket;
};

export default useWebRTC;
