import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const Wrapper = styled.div`
  flex: 1 1 auto;
  padding: 0 20;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: ${COLOR.primary2};
  overflow: hidden;
`;