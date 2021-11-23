import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const MenuBox = styled.div`
  flex: 0 0 auto;
  width: 320px;
  height: 100%;
  border-left: 1px solid ${COLOR.line};
  display: flex;
  flex-direction: column;
`;

export const TopBar = styled.div`
  flex: 0 0 auto;
  width: 100%;
  height: 58px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${COLOR.line};

  &::before {
    width: 23px;
    content: '';
    visibility: hidden;
  }
  & > span {
    font-size: 18px;
    user-select: none;
  }
`;

export const CloseButton = styled.button`
  width: 23px;
  height: 23px;
  padding: 0;

  background-color: ${COLOR.body};
  outline: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &::before,
  &::after {
    display: inline-block;
    position: absolute;
    content: ' ';
    height: 15px;
    width: 2px;
    background-color: ${COLOR.white};
    border-radius: 10px;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

export const SelectBox = styled.div`
  padding: 10px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
