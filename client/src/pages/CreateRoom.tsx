import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNoticeMessage } from '@store/notice';
import Socket from '@socket/socket';
import Loading from '@components/custom/Loading';

const CreateRoom: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    Socket.connect();

    const waiting = setTimeout(() => {
      dispatch(setNoticeMessage({ errorMessage: '방을 생성하지 못 했습니다.' }));
      history.replace('/');
    }, 5000);
    const joining = ({ roomCode }) => {
      clearTimeout(waiting);
      history.replace(`/room/${roomCode}`);
    };

    const functions = Socket.create({ joining });
    functions.createRoom();

    return () => {
      functions?.disconnecting();
      Socket.disconnect();
    };
  }, []);

  return <Loading />;
};

export default CreateRoom;
