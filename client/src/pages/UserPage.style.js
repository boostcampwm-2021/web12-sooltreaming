import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const FullScreen = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: ${COLOR.background};
`;

export const Contents = styled.div`
  flex: 1;
  padding: 40px 20px;

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
