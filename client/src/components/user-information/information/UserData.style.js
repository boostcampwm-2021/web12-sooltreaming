import styled from 'styled-components';
import { COLOR, BOX_SHADOW } from '@constant/style';

export const DataTable = styled.table`
  ${BOX_SHADOW}
  width: 410px;
  margin: 50px auto 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${COLOR.white};
  border: 1px solid ${COLOR.line};
  border-radius: 10px;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const DataRow = styled.tr`
  border-bottom: 1px solid ${COLOR.line};
  &:last-child {
    border-bottom: none;
  }
`;

export const Title = styled.td`
  width: 150px;
  padding: 15px;
  border-right: 1px solid ${COLOR.line};
  text-align: center;
  user-select: none;
`;
export const Data = styled.p`
  width: 260px;
  padding: 10px;
  margin: 0;
  text-align: center;
  word-break: break-all;
  white-space: wrap;
  font-weight: bold;
  color: ${COLOR.titleActive};
  -webkit-user-drag: none;
`;
