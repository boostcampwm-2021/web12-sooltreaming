import React, { useRef, useEffect } from 'react';
import { Screen, CheersScreen } from '@components/room/animation-screen/index.style';
import QuestionMark from '@components/room/animation-screen/QuestionMark';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setIsCheers } from '@store/room';
import useMarkSocket from '@hooks/socket/useMarkSocket';
import { CHEERS_GIF_NUM, CHEERS_TIME, LISTED_GIF } from 'sooltreaming-domain/constant/addition';

const AnimationScreen: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const screenRef = useRef<HTMLDivElement>(null);
  const cheersRef = useRef<HTMLImageElement>(null);
  const isCheers = useSelector((state: RootState) => state.room.isCheers);

  const { marks, addQuestionMark } = useMarkSocket();
  // 랜덤한 gif사진을 뽑아서 출력
  const randomDisplay = () => {
    const randomNum = Math.floor(Math.random() * CHEERS_GIF_NUM);
    const targetGif = LISTED_GIF[randomNum];

    if (cheersRef.current) {
      cheersRef.current.src = targetGif as any;
      cheersRef.current.style.display = 'block';
    }

    // 5초후에 false로 바꿔서 버튼 동작하게 만듦
    setTimeout(() => {
      dispatch(setIsCheers(false));
      if (cheersRef.current) {
        cheersRef.current.src = '';
        cheersRef.current.style.display = 'none';
      }
    }, CHEERS_TIME);
  };

  // 건배 boolean이 바뀌었는지 아닌지
  useEffect(() => {
    if (!isCheers) return;
    randomDisplay();
  }, [isCheers]);

  const onClickScreen = (e) => {
    e.preventDefault();
    if (!screenRef.current) return;

    const { clientWidth, clientHeight } = screenRef.current;
    const { clientX, clientY } = e;
    addQuestionMark({ x: clientX / clientWidth, y: clientY / clientHeight });
  };

  return (
    <Screen onContextMenu={onClickScreen} ref={screenRef}>
      {Object.entries(marks).map(([key, { x, y }]) => {
        if (!screenRef.current) return {};
        const { clientWidth, clientHeight } = screenRef.current;
        const clientX = x * clientWidth;
        const clientY = y * clientHeight;
        return <QuestionMark key={`Question-${key}`} x={clientX} y={clientY} />;
      })}
      <CheersScreen ref={cheersRef} />
    </Screen>
  );
};

export default AnimationScreen;
