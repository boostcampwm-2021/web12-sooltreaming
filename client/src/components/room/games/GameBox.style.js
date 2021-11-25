import styled from 'styled-components';
import { COLOR, BOX_SHADOW } from '@constant/style';

export const InfoContainer = styled.li`
  ${BOX_SHADOW}
  display: flex;
  background-color: ${COLOR.white};
  padding: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }
`;

export const Title = styled.div`
  display: flex;
  margin: auto 0;
  align-items: center;
  svg {
    margin-right: 10px;
  }
`;
