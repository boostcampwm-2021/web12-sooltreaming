import React, { useRef } from 'react';
import { LobbyWrapper, LobbyInput, LobbyButton, LobbyTitle } from './Lobby.style.js';
import { RouteComponentProps } from 'react-router-dom';
import Header from '@src/components/Header';

const Lobby: React.FunctionComponent<RouteComponentProps> = (props) => {
  const nickname = 'hostname';
  const chatRoomCodeInput = useRef<HTMLInputElement>(null);

  const pushState = (roomCode) => {
    props.history.push(`/chatRoom/${roomCode}`);
  };

  const joinChatRoom = () => {
    const roomCode = chatRoomCodeInput.current?.value;
    pushState(roomCode);
  };

  const createChatRoom = () => {
    pushState(undefined);
  };

  return (
    <LobbyWrapper>
      <Header />
      <LobbyTitle>
        오늘도 적당히 음주하세요!
        <span> 화상ㅊㅐ팅 </span>
        님!
      </LobbyTitle>
      <LobbyInput ref={chatRoomCodeInput} placeholder={'입장하실 방의 코드를 입력해주세요.'} />
      <LobbyButton onClick={joinChatRoom}>방 참가하기</LobbyButton>
      <LobbyButton onClick={createChatRoom}>방 생성하기</LobbyButton>
    </LobbyWrapper>
  );
};

export default Lobby;
