import React from 'react';
import Modal from '@src/components/custom/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setCurrentGame } from '@store/room';
import { Contents, GameTitle, GameStopButton } from '@components/room/games/LiarGame.style';
import type { LiarGamePropType } from '@ts-types/components/room';

const LiarGame: React.FC<LiarGamePropType> = ({ randomNumRef }) => {
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
        <GameTitle>라이어 게임</GameTitle>
        <div>{users[gameHost].nickname}님이 게임을 시작하셨습니다.</div>
        <GameStopButton onClick={stopGame}>게임 종료</GameStopButton>
      </Contents>
    </Modal>
  );
};

export default LiarGame;
