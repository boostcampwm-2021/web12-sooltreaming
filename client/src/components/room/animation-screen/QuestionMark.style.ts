import styled, { keyframes } from 'styled-components';
import { Z_INDEX } from '@constant/style';

const activeMark = keyframes`
  100% {
    background-position: -6900px 0;
  }
`;

export const QuestionScreen = styled.div<{ x: number; y: number }>`
  width: 150px;
  height: 213px;
  position: absolute;
  top: ${(props) => props.y - 170}px;
  left: ${(props) => props.x - 75}px;

  background-image: url('/images/question-sprite.png');
  background-repeat: no-repeat;
  animation: ${activeMark} 2s steps(46) 1;

  z-index: ${Z_INDEX.question};
`;
