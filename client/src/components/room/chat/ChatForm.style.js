import styled from 'styled-components';
import { COLOR, INPUT_STYLE } from '@constant/style';

export const SendingForm = styled.form`
  flex: 0 0 auto;
  width: 100%;
  height: 52px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-top: 1px solid ${COLOR.line};
  background-color: ${COLOR.background};

  & > input {
    ${INPUT_STYLE}
    flex: 1 1 auto;
    height: 36px;
    padding: 0 8px;
    margin: 0 8px;
    border-radius: 8px;
  }
  & > button {
    flex: 0 0 auto;
    width: 28px;
    height: 28px;
    padding: 0;
    margin: 0 16px 0 8px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    border-radius: 8px;
    background-color: transparent;
    cursor: pointer;
    &:active {
      background-color: ${COLOR.primary1};
    }
  }
`;
