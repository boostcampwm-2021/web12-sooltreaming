import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const ModalContents = styled.div`
  width: 500px;
  height: 300px;
  padding: 20px;
  margin-left: 80px;
  margin-right: 80px;
  margin-bottom: 40px;
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
  font-size: 20px;
  margin: 0 0 20px 0;
  &:last-child {
    margin: 0;
  }
`;
