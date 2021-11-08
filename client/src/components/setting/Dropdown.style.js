import styled from 'styled-components';
import { COLOR, BTN_STYLE } from '@constant/style';

export const Wrapper = styled.div`
  max-width: 340px;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MenuButton = styled.div`
  ${BTN_STYLE}
  max-width: 340px;
  width: 100%;
  height: 50px;
  margin-top: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 32px;
  font-weight: 500px;
  border-radius: 100px;

  padding: 30px;
`;

export const Menu = styled.ul`
  max-width: 340px;
  width: 100%;

  position: absolute;
  margin-top: 260px;
  list-style: none;
  padding-left: 0px;

  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5), 0px 2px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  border-radius: 10px;

  background: ${COLOR.background};
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

export const Text = styled.span`
  color: ${COLOR.white};
`;
