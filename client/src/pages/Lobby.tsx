import React, { useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { errorMessageState } from '@src/store/error';
import socket from '@socket/socket';

const Lobby: React.FunctionComponent<RouteComponentProps> = (props) => {
  const nickname = 'hostname';
  const chatRoomCodeInput = useRef<HTMLInputElement>(null);
  const setMessage = useSetRecoilState(errorMessageState);

  const joinChatRoom = () => {
    const roomCode = chatRoomCodeInput.current?.value;
    socket.connect();
    socket
      .chatRoom({ setMessage, history: props.history })
      .emitChatRoom('join_chat_room', { nickname, roomCode });
  };

  const createChatRoom = () => {
    socket.connect();
    socket
      .chatRoom({ setMessage, history: props.history })
      .emitChatRoom('create_chat_room', { nickname });
  };

  return (
    <div>
      <input ref={chatRoomCodeInput}></input>
      <button onClick={createChatRoom}>생성</button>
      <button onClick={joinChatRoom}>입장</button>
    </div>
  );
};

export default Lobby;
