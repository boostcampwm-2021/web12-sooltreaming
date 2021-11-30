import styled from 'styled-components';
import { COLOR, BTN_STYLE, BOX_SHADOW } from '@constant/style';

export const ModalContents = styled.div`
  width: 640px;
  height: 200px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
    height: 16px;
    border-radius: 10px;
    background: ${COLOR.line};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR.primary3};
    border-radius: 10px;
  }
`;

export const LogData = styled.p`
  margin: 0 0 20px 0;
  &:last-child {
    margin: 0;
  }
`;

export const CheckButton = styled.button`
  ${BOX_SHADOW}
  ${BTN_STYLE}
  width: 120px;
  padding: 10px;
  margin: 30px 0;
  border-radius: 100px;
`;
