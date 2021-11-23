import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const FullScreen = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${COLOR.background};
`;

export const FlexBox = styled.section`
  position: relative;
  flex: 1 1 auto;
  overflow: hidden;
  position: relative;
`;

export const ColumnBox = styled(FullScreen)`
  flex-direction: column;
`;
