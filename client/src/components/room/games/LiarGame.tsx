import React from 'react';
import Modal from '@src/components/custom/Modal';
import Socket from '@socket/socket';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setCurrentGame } from '@store/room';
import { Contents, GameTitle, GameStopButton } from '@components/room/games/LiarGame.style';
import type { LiarGamePropType } from '@ts-types/components/room';

const LiarGame: React.FC<LiarGamePropType> = ({ keywordRef }): React.ReactElement => {
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
      <Contents keyword={keywordRef.current}>
        <GameTitle>라이어 게임</GameTitle>
        <div className="host">
          <span>{users[gameHost].nickname}</span> 님이 게임을 시작하셨습니다.
        </div>
        {keywordRef.current === '라이어' ? (
          <div className="keyword">
            당신은 <span>{keywordRef.current}</span> 입니다.
          </div>
        ) : (
          <div className="keyword">
            키워드는 <span>{keywordRef.current}</span> 입니다.
          </div>
        )}
        {gameHost === Socket.getSID() ? (
          <GameStopButton onClick={stopGame}>전체 닫기</GameStopButton>
        ) : (
          <GameStopButton onClick={stopGame}>닫기</GameStopButton>
        )}
      </Contents>
    </Modal>
  );
};

export default LiarGame;
