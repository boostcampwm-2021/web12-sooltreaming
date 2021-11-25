import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const ColumnBox = styled.div`
  display: flex;

  flex-direction: column;
  overflow-y: scroll;

  margin-bottom: 10px;
  padding: 15px;
  position: relative;

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
