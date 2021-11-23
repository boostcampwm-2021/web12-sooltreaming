import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const ScrollBox = styled.div`
  flex: 1 1 auto;
  padding: 0 20;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.primary2};
  overflow: hidden;
`;

export const MessageList = styled.ul`
  flex: 1 1 auto;
  padding: 0 8px 0 0;
  margin: 10px 5px 10px;

  overflow-x: hidden;
  overflow-y: scroll;
  word-wrap: break-word;

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
