import styled, { keyframes } from 'styled-components';
import { COLOR } from '@constant/style';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.background};
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const loadingSize = 300;

export const Spinner = styled.div`
  z-index: 1;
  width: ${loadingSize}px;
  height: ${loadingSize}px;
  border: 30px solid ${COLOR.line};
  border-radius: 50%;
  border-top: 30px solid ${COLOR.titleActive};
  -webkit-animation: ${spin} 1s linear infinite;
  animation: ${spin} 1s linear infinite;

  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 200px;
    height: 200px;
  }
`;
