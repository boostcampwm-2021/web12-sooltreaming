import React, { useEffect } from 'react';
import { QuestionImg } from './QuestionMark.style';

type QuestionMarkPropTypes = {
  identifier: string;
  disappearSelf: Function;
  x: number;
  y: number;
};

const QuestionMark: React.FC<QuestionMarkPropTypes> = ({ identifier, disappearSelf, x, y }) => {
  useEffect(() => {
    setTimeout(() => {
      disappearSelf(identifier);
    }, 1900);
  }, []);
  return <QuestionImg x={x} y={y} />;
};

export default QuestionMark;
