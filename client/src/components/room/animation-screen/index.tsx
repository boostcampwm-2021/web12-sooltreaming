import React, { useRef, useEffect } from 'react';
import { Wrapper, ScreenImg, QuestionList } from '@components/room/animation-screen/index.style';
import QuestionMark from '@components/room/animation-screen/QuestionMark';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setIsCheers } from '@store/room';
import useMarkSocket from '@hooks/socket/useMarkSocket';
import { CHEERS_GIF_NUM, CHEERS_TIME, LISTED_GIF } from 'sooltreaming-domain/constant/addition';

const AnimationScreen: React.FC = () => {
  const dispatch = useDispatch();
  const screenRef = useRef<HTMLImageElement>(null);
  const isCheers = useSelector((state: RootState) => state.room.isCheers);

  const { marks, addQuestionMark } = useMarkSocket();
  // 랜덤한 gif사진을 뽑아서 출력
  const randomDisplay = () => {
    const randomNum = Math.floor(Math.random() * CHEERS_GIF_NUM);
    const targetGif = LISTED_GIF[randomNum];

    if (screenRef.current) {
      screenRef.current.src = targetGif as any;
      screenRef.current.style.display = 'block';
    }

    // 5초후에 false로 바꿔서 버튼 동작하게 만듦
    setTimeout(() => {
      dispatch(setIsCheers(false));
      if (screenRef.current) {
        screenRef.current.src = '';
        screenRef.current.style.display = 'none';
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
    const { clientX: x, clientY: y } = e;
    addQuestionMark({ x, y });
  };

  return (
    <Wrapper onContextMenu={onClickScreen}>
      <QuestionList>
        {Object.entries(marks).map(([key, { x, y }]) => {
          return <QuestionMark key={`Question-${key}`} x={x} y={y} />;
        })}
      </QuestionList>
      <ScreenImg ref={screenRef} />
    </Wrapper>
  );
};

export default AnimationScreen;
