import styled from 'styled-components';
import { COLOR, INPUT_STYLE, BTN_STYLE } from '@src/Constant';

export const ChatWrapper = styled.div``;

export const ChatForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > input {
    ${INPUT_STYLE}
  }
  & > button {
    width: 28px;
    height: 28px;
    padding: 0;
    margin: 0;
    border: none;
    background-color: transparent;
  }
`;
