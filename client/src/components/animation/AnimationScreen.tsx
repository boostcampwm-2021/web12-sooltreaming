import React, { useState, useRef, useEffect } from 'react';
import { Wrapper, ScreenImg, QuestionList } from './AnimationScreen.style';
import QuestionMark from './QuestionMark';

const CHEERS_GIF_NUM = 2;
const LISTED_GIF = ['/images/beer-cheers1.gif', '/images/beer-cheers2.gif'];

type AnimationScreenPropsType = {
  isCheers: any;
  setIsCheers: any;
};

type MarkType = {
  [key: number]: { x: number; y: number };
};

const AnimationScreen: React.FC<AnimationScreenPropsType> = ({ isCheers, setIsCheers }) => {
  const screenRef = useRef<HTMLImageElement>(null);
  const [marks, setMarks] = useState<MarkType>({});
  const [count, setCount] = useState<number>(0);

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
      setIsCheers(false);
      if (screenRef.current) {
        screenRef.current.src = '';
        screenRef.current.style.display = 'none';
      }
    }, 5000);
  };

  // 건배 boolean이 바뀌었는지 아닌지
  useEffect(() => {
    if (!isCheers) return;
    randomDisplay();
  }, [isCheers]);

  const onClickScreen = (e) => {
    e.preventDefault();
    const { clientX: x, clientY: y } = e;
    setMarks((prev) => {
      return { ...prev, [count]: { x, y } };
    });
    setCount((prev) => prev + 1);
  };

  const disappearSelf = (id) => {
    setMarks((prev) => {
      const newMarks = { ...prev };
      delete newMarks[id];
      return newMarks;
    });
  };

  return (
    <Wrapper onContextMenu={onClickScreen}>
      <QuestionList>
        {Object.entries(marks).map(([key, { x, y }]) => (
          <QuestionMark
            key={`Question-${key}`}
            identifier={key}
            disappearSelf={disappearSelf}
            x={x}
            y={y}
          />
        ))}
      </QuestionList>
      <ScreenImg ref={screenRef} />
    </Wrapper>
  );
};

export default AnimationScreen;
