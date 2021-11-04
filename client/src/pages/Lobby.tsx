import React, { useRef } from 'react';
import { Wrapper, TitleDiv, CodeInput, BigButton } from './Lobby.style.js';
import { RouteComponentProps } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { errorMessageState } from '@src/store/message';
import Header from '@src/components/Header';
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
    <Wrapper>
      <Header />
      <TitleDiv>
        오늘도 적당히 음주하세요!
        <span> 화상ㅊㅐ팅 </span>
        님!
      </TitleDiv>
      <CodeInput ref={chatRoomCodeInput} placeholder={'입장하실 방의 코드를 입력해주세요.'} />
      <BigButton onClick={joinChatRoom}>방 참가하기</BigButton>
      <BigButton onClick={createChatRoom}>방 생성하기</BigButton>
    </Wrapper>
  );
};

export default Lobby;
