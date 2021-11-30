import React from 'react';
import Modal from '@src/components/custom/Modal';
import Socket from '@socket/socket';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setCurrentGame } from '@store/room';
import { Contents, GameTitle, GameStopButton } from '@components/room/games/UpdownGame.style';
import type { UpdownGamePropType } from '@ts-types/components/room';

const UpdownGame: React.FC<UpdownGamePropType> = ({ randomNumRef }): React.ReactElement => {
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
        <Contents>
          <GameTitle>업다운 게임</GameTitle>
          <img src="/images/soju-cap.png" alt="" />
          <div className="random-num">{randomNumRef.current}</div>
          <GameStopButton onClick={stopGame}>게임 종료</GameStopButton>
        </Contents>
      ) : (
        <Contents>
          <GameTitle>업다운 게임</GameTitle>
          <div>
            <span>{users[gameHost].nickname}</span> 님이 게임을 시작하셨습니다.
          </div>
          <GameStopButton onClick={stopGame}>닫기</GameStopButton>
        </Contents>
      )}
    </Modal>
  );
};

export default UpdownGame;
