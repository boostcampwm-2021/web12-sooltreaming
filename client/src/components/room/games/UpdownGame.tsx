import React from 'react';
import Modal from '@src/components/custom/Modal';
import Socket from '@socket/socket';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setCurrentGame } from '@store/room';
import { Wrapper, GameTitleDiv, GameStopButton } from '@components/room/games/UpdownGame.style';

const UpdownGame: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.room.users);
  const gameHost = useSelector((state: RootState) => state.room.currentGame.host);
  const stopGame = () => {
    dispatch(setCurrentGame({ title: '', host: gameHost }));
  };
  return (
    <Modal
      isOpen={true}
      renderCenter={true}
      isRelative={false}
      absolutePos={{ top: '50%', left: '50%' }}
    >
      {gameHost === Socket.getSID() ? (
        <Wrapper>
          <GameTitleDiv>업다운 게임</GameTitleDiv>
          <div>{Math.floor(Math.random() * 50) + 1}</div>
          <GameStopButton onClick={stopGame}>게임 종료</GameStopButton>
        </Wrapper>
      ) : (
        <Wrapper>
          <GameTitleDiv>업다운 게임</GameTitleDiv>
          <div>{users[gameHost].nickname}님이 게임을 시작하셨습니다.</div>
          <GameStopButton onClick={stopGame}>닫기</GameStopButton>
        </Wrapper>
      )}
    </Modal>
  );
};

export default UpdownGame;
