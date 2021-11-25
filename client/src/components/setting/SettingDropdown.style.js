import styled from 'styled-components';
import { COLOR, BTN_STYLE } from '@constant/style';

export const MenuButton = styled.div`
  ${BTN_STYLE}
  max-width: 340px;
  width: 100%;
  height: 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 19px;
  font-weight: 500px;
  border-radius: 100px;

  padding: 30px;
  color: ${COLOR.white};

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const MenuItem = styled.li`
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;

  list-style: none;
  padding: 12px 23px;
  color: ${COLOR.titleActive};
  word-break: break-all;

  &:hover {
    background: ${COLOR.titleActive};
    color: ${COLOR.background};
  }
`;
