import styled from 'styled-components';
import { COLOR } from '@src/Constant';

export const ChatWrapper = styled.div`
  flex: 1 1 auto;
  padding: 0 20;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.primary2};
  overflow: hidden;
`;

export const ChatWindow = styled.div`
  flex: 1 1 auto;
  padding-right: 8px;
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
