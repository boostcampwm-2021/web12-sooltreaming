import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const GameListBox = styled.ul`
  flex: 1 1 auto;
  padding: 0 20px;
  margin: 0;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.primary2};
  overflow: hidden;
`;
