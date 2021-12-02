import React from 'react';
import Modal from '@src/components/custom/Modal';
import Socket from '@socket/socket';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setCurrentGame } from '@store/room';
import { Contents, GameTitle, GameStopButton } from '@components/room/games/RandomPickGame.style';
import type { RandomPickGamePropType } from '@ts-types/components/room';

const RandomPickGame: React.FC<RandomPickGamePropType> = ({ onePickRef }): React.ReactElement => {
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
      <Contents>
        <GameTitle>랜덤픽 게임</GameTitle>
        <div className="host">
          <span>{users[gameHost].nickname}</span> 님이 게임을 시작하셨습니다.
        </div>
        <div className="random-pick">
          <span>{users[onePickRef.current].nickname}</span> 님이 당첨되셨습니다!
        </div>
        {gameHost === Socket.getSID() ? (
          <GameStopButton onClick={stopGame}>전체 닫기</GameStopButton>
        ) : (
          <GameStopButton onClick={stopGame}>닫기</GameStopButton>
        )}
      </Contents>
    </Modal>
  );
};

export default RandomPickGame;
