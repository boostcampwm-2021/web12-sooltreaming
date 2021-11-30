import styled from 'styled-components';
import { COLOR, BTN_STYLE, BOX_SHADOW } from '@constant/style';

export const HomeButton = styled.div`
  ${BTN_STYLE}
  ${BOX_SHADOW}
  width: 28px;
  height: 28px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContents = styled.div`
  width: 600px;
  max-height: 95vh;
  padding: 50px 30px;

  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
    height: 16px;
    border-radius: 10px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR.primary3};
    border-radius: 10px;
  }
`;
