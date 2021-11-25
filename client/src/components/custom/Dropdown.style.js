import styled from 'styled-components';
import { COLOR, Z_INDEX, BOX_SHADOW } from '@constant/style';

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
  z-index: ${Z_INDEX.modal};
`;

export const ItemList = styled.ul`
  ${BOX_SHADOW}

  max-width: 340px;
  width: 100%;

  position: absolute;
  list-style: none;
  padding-left: 0px;

  backdrop-filter: blur(4px);

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
