import React from 'react';
import Modal from '@src/components/custom/Modal';
import Socket from '@socket/socket';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setCurrentGame } from '@store/room';

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
        <>
          <div>업다운 게임</div>
          <div>{Math.floor(Math.random() * 50) + 1}</div>
          <button onClick={stopGame}>게임 종료</button>
        </>
      ) : (
        <>
          <div>{users[gameHost].nickname}님이 업다운 게임을 시작하셨습니다.</div>
          <button onClick={stopGame}>닫기</button>
        </>
      )}
    </Modal>
  );
};

export default UpdownGame;
