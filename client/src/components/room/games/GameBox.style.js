import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const InfoContainer = styled.li`
  display: flex;
  background-color: ${COLOR.white};
  padding: 15px;
  border-radius: 10px;
  margin: 15px;
  box-shadow: 1px 1px 1px 1px #ccc;
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
