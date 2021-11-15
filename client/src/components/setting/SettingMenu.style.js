import styled from 'styled-components';
import { COLOR, BTN_STYLE } from '@constant/style';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0px;
  }
`;

export const ToggleButton = styled.div`
  width: 45px;
  margin-right: 10px;
  background-color: none;
  background: none;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
`;

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

export const IconDiv = styled.div`
  position: absolute;
`;
