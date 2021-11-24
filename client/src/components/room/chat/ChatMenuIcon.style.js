import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const IconContainer = styled.button`
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

export const CountBox = styled.div`
  max-width: 50px;
  position: absolute;
  padding: 2px 5px;
  margin-top: -8px;
  margin-left: -8px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  font-weight: bold;

  color: ${COLOR.white};
  background-color: ${COLOR.error};
  border-radius: 7px;
`;
