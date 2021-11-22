import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNoticeMessage } from '@store/notice';
import Socket from '@socket/socket';

const useTicket = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { code } = useParams();

  useEffect(() => {
    Socket.connect();

    const abortEnter = ({ message }) => {
      dispatch(setNoticeMessage({ errorMessage: message || '방에 입장하지 못 했습니다.' }));
      history.replace('/');
    };
    const socket = Socket.ticket({ abortEnter });
    socket.requestValidation({ code });

    return () => {
      socket.disconnecting();
      Socket.disconnect();
    };
  }, []);
};

export default useTicket;
