import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const Wrapper = styled.div`
  flex: 1 1 auto;
  padding: 0 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLOR.primary2};
  overflow: hidden;
`;

export const Column = styled.div`
  max-width: 400px;
  width: 95%;
  display: flex;
  flex-direction: column;

  button {
    margin-top: 20px;
  }
`;
