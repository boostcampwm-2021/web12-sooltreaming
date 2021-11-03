import React from 'react';
import { LobbyWrapper, LobbyInput, LobbyButton, LobbyTitle } from './Lobby.style.js';

const Lobby: React.FC = () => {
  return (
    <LobbyWrapper>
      <LobbyTitle>
        오늘도 적당히 음주하세요!
        <span> 화상ㅊㅐ팅 </span>
        님!
      </LobbyTitle>
      <LobbyInput placeholder={'입장하실 방의 코드를 입력해주세요.'} />
      <LobbyButton>방 참가하기</LobbyButton>
      <LobbyButton>방 생성하기</LobbyButton>
    </LobbyWrapper>
  );
};

export default Lobby;
