import styled from 'styled-components';
import { COLOR, BOX_SHADOW } from '@constant/style';

export const ColumnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`;

export const RowBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 8px;

  & > span {
    font-size: 20px;
    font-weight: bold;
  }
`;

export const IconButton = styled.button`
  background-color: none;
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;

  & > svg {
    pointer-events: none;
  }
`;

export const ToggleButton = styled.div`
  width: 140px;
  height: 40px;
  cursor: pointer;
  user-select: none;

  position: relative;

  background-color: ${COLOR.line};
  border-radius: 10px;

  margin-left: 8px;
`;

export const DialogButton = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 70px;
  width: 50%;
  height: 100%;

  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? COLOR.titleActive : COLOR.error)};
  color: ${COLOR.white};

  box-sizing: border-box;
  ${BOX_SHADOW}

  padding: 8px 12px;

  position: absolute;
  left: ${(props) => (props.isSelected ? 0 : 70)}px;
  transition: all 0.3s ease;

  font-size: 14px;
  font-weight: bold;
`;
