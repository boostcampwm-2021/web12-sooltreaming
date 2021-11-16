import React, { useState, useRef, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { Wrapper, ScreenImg, QuestionList } from './AnimationScreen.style';
import QuestionMark from './QuestionMark';
import Socket from '@socket/socket';

const CHEERS_GIF_NUM = 2;
const CHEERS_TIME = 5000;
const LISTED_GIF = ['/images/beer-cheers1.gif', '/images/beer-cheers2.gif'];

type AnimationScreenPropsType = {
  isCheers: any;
  setIsCheers: any;
  user: object;
};

type MarkType = {
  [key: number]: { x: number; y: number };
};

const AnimationScreen: React.FC<AnimationScreenPropsType> = ({
  isCheers,
  setIsCheers,
  user,
}) => {
  const {code} = useParams();
  const question = useRef<any>(() => {});
  const screenRef = useRef<HTMLImageElement>(null);
  const [marks, setMarks] = useState<MarkType>({});

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
    }, CHEERS_TIME);
  };

  // 건배 boolean이 바뀌었는지 아닌지
  useEffect(() => {
    if (!isCheers) return;
    randomDisplay();
  }, [isCheers]);

  useEffect(() => {
    const functions = Socket.questionmark({ setMarks });
    question.current = functions.questionMark;
    return () => {
      functions.disconnecting();
    };
  }, []);

  const onClickScreen = (e) => {
    e.preventDefault();
    const { clientX: x, clientY: y } = e;
    question.current({
      x,
      y,
      chatRoomCode: code,
      user,
    });
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
        {Object.entries(marks).map(([key, { x, y }]) => {
          return (
            <QuestionMark
              key={`Question-${key}`}
              identifier={key}
              disappearSelf={disappearSelf}
              x={x}
              y={y}
            />
          );
        })}
      </QuestionList>
      <ScreenImg ref={screenRef} />
    </Wrapper>
  );
};

export default AnimationScreen;
