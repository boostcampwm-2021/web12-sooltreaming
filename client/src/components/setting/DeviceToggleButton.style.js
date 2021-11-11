import styled from 'styled-components';
import { COLOR, BTN_STYLE } from '@constant/style';

export const ToggleButton = styled.div`
  width: 45px;
  background-color: none;
  background: none;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconDiv = styled.div`
  position: absolute;

  &: hover {
    & svg {
      padding: 2px;
    }
    cursor: pointer;
  }
`;
