import styled from 'styled-components';

export const QuestionImg = styled.img<{ x: number; y: number }>`
  width: 150px;
  position: absolute;
  top: ${(props) => props.y - 170}px;
  left: ${(props) => props.x - 75}px;
`;
