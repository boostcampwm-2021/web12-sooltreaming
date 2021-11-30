import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const Header = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;
  margin: 30px 0 40px 0;
  color: ${COLOR.titleActive};
  user-select: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 28px;

  & span {
    color: ${COLOR.point};
  }
`;

export const Button = styled.button`
  padding: 0;
  margin: 0;

  border: none;
  cursor: pointer;
  background-color: transparent;

  &:hover {
    & > svg {
      padding: 2px;
    }
  }
  & > svg {
    pointer-events: none;
  }
`;

export const CloseBox = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`;
