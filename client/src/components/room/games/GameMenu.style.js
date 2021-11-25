import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const GameListBox = styled.ul`
  flex: 1 1 auto;
  padding: 15px;
  margin: 0;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.primary2};
  overflow: hidden;
`;

export const GameRuleBox = styled.div`
  padding: 10px;
  font-size: 15px;
`;

export const GameTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${COLOR.titleActive};
  margin-bottom: 10px;
  align-items: center;
`;
