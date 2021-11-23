import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const Container = styled.div`
  max-width: 340px;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ItemListBox = styled.div`
  width: 100%;
  position: relative;
  top: -10px;
`;

export const ItemList = styled.ul`
  max-width: 340px;
  width: 100%;

  position: absolute;
  list-style: none;
  padding-left: 0px;

  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5), 0px 2px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  border-radius: 10px;

  background: ${COLOR.background};
`;

export const ToggleButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  outline: none;
`;
