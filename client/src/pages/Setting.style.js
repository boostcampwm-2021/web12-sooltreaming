import styled from 'styled-components';
import { COLOR, BTN_STYLE, CANCLE_BTN_STYLE } from '@constant/style';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${COLOR.background};
`;

export const Row = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 50px;
`;

const BUTTON = styled.button`  
  width: 300px;
  height: 50px;
  margin-top: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 32px;
  font-weight: 500px;
  border-radius: 100px;

  padding: 30px;
  margin: 30px;
`;

export const CancleButton = styled(BUTTON)`
  ${CANCLE_BTN_STYLE}
`;

export const Button = styled(BUTTON)`
  ${BTN_STYLE}
`;
