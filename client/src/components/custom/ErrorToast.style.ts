import styled, { keyframes } from 'styled-components';
import { COLOR, Z_INDEX, BOX_SHADOW } from '@constant/style';
import { TOAST_TIME } from 'sooltreaming-domain/constant/addition';

const fadeOut = keyframes`
  0% {
    opacity: 0;
    margin-left: -25%;
  }
  87%{
    opacity: 1;
    margin-left: -50%;
  }
  95%{
    opacity: 1;
    margin-left: -50%;
  }
  100% {
    opacity: 0;
    margin-left: -75%;
  }
`;

export const ErrorToastBox = styled.div`
  ${BOX_SHADOW}
  position: fixed;
  left: 100%;
  bottom: 100px;
  border: 2px solid ${COLOR.error};
  padding: 15px 25px;

  transform: translateX(-50%);

  background-color: ${COLOR.white};

  z-index: ${Z_INDEX.toast};

  font-size: 20px;
  font-weight: bold;

  animation-duration: ${TOAST_TIME}ms;
  animation-timing-function: ease-out;
  animation-name: ${fadeOut};
  animation-fill-mode: forwards;

  color: ${COLOR.error};
`;
