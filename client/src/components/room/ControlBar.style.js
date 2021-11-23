import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const BarContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;

  background-color: ${COLOR.primary2};
  align-items: center;
  justify-content: space-between;
`;

export const LineBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const ControlButton = styled.button`
  background-color: none;
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  &:hover {
    & > svg {
      padding: 2px;
    }
  }
  & > svg {
    pointer-events: none;
  }
`;
