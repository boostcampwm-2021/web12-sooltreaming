import styled from 'styled-components';
import { COLOR, INPUT_STYLE, BTN_STYLE } from '@constant/style';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${COLOR.background};
`;

export const TitleDiv = styled.div`
  margin-bottom: 100px;
  font-size: 48px;
  font-weight: 700;
  color: ${COLOR.titleActive};
  user-select: none;
  white-space: nowrap;

  & > span {
    color: ${COLOR.point};
  }
`;

export const CodeInput = styled.input`
  ${INPUT_STYLE}
  width: 100%;
  max-width: 616px;
  height: 76px;
  padding: 0 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  border-radius: 100px;
  font-weight: 500;
  font-size: 32px;
  text-align: center;
`;

export const BigButton = styled.button`
  ${BTN_STYLE}
  width: 100%;
  max-width: 469px;
  height: 76px;
  margin-top: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 32px;
  font-weight: 500px;
  border-radius: 100px;
`;
