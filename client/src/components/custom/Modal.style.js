import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const Wrapper = styled.div`
  position: relative;
`;

export const ContentDiv = styled.div`
  position: absolute;
  padding: 10px;
  background-color: ${COLOR.background};
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5), 0px 2px 4px rgba(0, 0, 0, 0.25);
`;
