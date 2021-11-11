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

  font-size: 20px;
  font-weight: 500px;
  border-radius: 100px;

  padding: 30px;
  color: ${COLOR.white};

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & > svg {
    flex: 0 0 auto;
  }
`;

export const MenuItem = styled.li`
  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;

  list-style: none;
  padding-left: 15px;
  color: ${COLOR.titleActive};

  &:hover {
    background: ${COLOR.titleActive};
    color: ${COLOR.background};
    border-radius: 10px 10px 10px 10px;
  }
`;
