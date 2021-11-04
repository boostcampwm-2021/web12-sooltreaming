import React, { useEffect } from 'react';
import { Wrapper, Loading } from './CreateRoom.style';
import { useHistory } from 'react-router-dom';
import Socket from '@socket/socket';
import { useSetRecoilState } from 'recoil';
import { errorMessageState } from '@src/store/message';

const CreateRoom: React.FunctionComponent = () => {
  const setMessage = useSetRecoilState(errorMessageState);
  const history = useHistory();

  useEffect(() => {
    Socket.connect();

    const waiting = setTimeout(() => {
      setMessage('방을 생성하지 못 했습니다.');
      history.replace('/');
    }, 5000);
    const joining = ({ roomCode }) => {
      clearTimeout(waiting);
      history.replace(`chatRoom/${roomCode}`);
    };

    Socket.host({ joining }).createRoom();

    return () => {
      Socket.disconnect();
    };
  }, []);

  return (
    <Wrapper>
      <Loading>
        <img src="/images/logo.png" alt="logo" />
      </Loading>
    </Wrapper>
  );
};

export default CreateRoom;
