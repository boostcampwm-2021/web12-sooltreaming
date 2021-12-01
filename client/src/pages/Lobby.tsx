import React, { useRef } from 'react';
import { FullScreen, Title, CodeInput, BigButton } from '@pages/Lobby.style.js';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import Header from '@components/Header';

const Lobby: React.FC = (): React.ReactElement => {
  const history = useHistory();
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const chatRoomCodeInput = useRef<HTMLInputElement>(null);

  const joinChatRoom = () => {
    const roomCode = chatRoomCodeInput.current?.value;
    if (roomCode !== '') history.push(`room/${roomCode}`);
  };

  const createChatRoom = () => {
    history.push('/create');
  };

  return (
    <FullScreen>
      <Header />
      <Title>
        오늘도 적당히 음주하세요!
        <span> {nickname || 'Judangs'} </span>
        님!
      </Title>
      <CodeInput ref={chatRoomCodeInput} placeholder={'입장하실 방의 코드를 입력해주세요.'} />
      <BigButton onClick={joinChatRoom}>방 참가하기</BigButton>
      <BigButton onClick={createChatRoom}>방 생성하기</BigButton>
    </FullScreen>
  );
};

export default Lobby;
