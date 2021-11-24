import { useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNoticeMessage } from '@store/notice';
import Socket from '@socket/socket';

const useTicketSocket = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { code } = useParams();

  const abortEnter = ({ message }) => {
    dispatch(setNoticeMessage({ errorMessage: message || '방에 입장하지 못 했습니다.' }));
    history.replace('/');
  };

  const socket = useMemo(() => Socket.ticket({ abortEnter }), []);
  useEffect(() => {
    Socket.connect();
    socket.requestValidation({ code });

    return () => {
      socket.disconnecting();
      Socket.disconnect();
    };
  }, []);

  return { successValidtaion: socket.successValidtaion };
};

export default useTicketSocket;
