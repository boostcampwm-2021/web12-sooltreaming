import styled, { keyframes } from 'styled-components';
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

export const soft = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const ItemList = styled.ul`
  width: 80%;
  ${BOX_SHADOW}

  position: absolute;
  /* right: 0; */
  list-style: none;
  padding-left: 0px;
  overflow: hidden;

  border-radius: 10px;

  -webkit-animation: ${soft} 0.2s linear;
  animation: ${soft} 0.2s linear;
  background: ${COLOR.background};

  & > li {
    border-bottom: 1px solid ${COLOR.line};
    &:last-child {
      border-bottom: none;
    }
  }
`;

export const ToggleButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  outline: none;

  svg {
    flex: 0 0 auto;
    margin-left: 10px;
    transition: transform 0.3s;
    transform: rotate(-180deg);
  }
  &:focus {
    svg {
      transform: rotate(0deg);
    }
  }
`;
