import styled from 'styled-components';
import { Z_INDEX } from '@constant/style';

export const Screen = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: -100%;

  z-index: ${Z_INDEX.cheers};
`;

export const CheersScreen = styled.img`
  width: 100%;
  height: 100%;
  display: none;
`;
