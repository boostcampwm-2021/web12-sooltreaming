import React, { useRef } from 'react';
import { Wrapper, TitleDiv, CodeInput, BigButton } from './Lobby.style.js';
import { useHistory } from 'react-router-dom';
import Header from '@src/components/Header';

const Lobby: React.FunctionComponent = () => {
  const history = useHistory();
  const nickname = '주당즈';
  const chatRoomCodeInput = useRef<HTMLInputElement>(null);

  const joinChatRoom = () => {
    const roomCode = chatRoomCodeInput.current?.value;
    history.push(`chatRoom/${roomCode}`);
  };

  const createChatRoom = () => {
    history.push('/create');
  };

  return (
    <Wrapper>
      <Header />
      <TitleDiv>
        오늘도 적당히 음주하세요!
        <span> 화상ㅊㅐ팅 </span>
        {nickname}님!
      </TitleDiv>
      <CodeInput ref={chatRoomCodeInput} placeholder={'입장하실 방의 코드를 입력해주세요.'} />
      <BigButton onClick={joinChatRoom}>방 참가하기</BigButton>
      <BigButton onClick={createChatRoom}>방 생성하기</BigButton>
    </Wrapper>
  );
};

export default Lobby;
