import styled, { keyframes, css } from 'styled-components';
import { COLOR, Z_INDEX } from '@constant/style';
import { TOAST_TIME } from 'sooltreaming-domain/constant/addition';


export const ErrorToastBox = styled.div`
  position: fixed;
  left: 100%;
  bottom: 100px;
  min-width: 200px;
  border-radius: 10px;
  border: 2px solid ${COLOR.error};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  padding: 15px 25px;

  transform: translateX(-50%);

  background-color: ${COLOR.white};

  z-index: ${Z_INDEX.toast};

  font-size: 20px;
  font-weight: bold;
  color: ${COLOR.error};
`;
