import styled from 'styled-components';
import { COLOR, INPUT_STYLE } from '@constant/style';

export const Header = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  & > h2 {
    padding: 0;
    margin: 30px 0 0 15px;
    color: ${COLOR.titleActive};
    user-select: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & span {
    color: ${COLOR.point};
  }
`;

export const PressSection = styled.div`
  width: 640px;
  padding: 50px 70px;
  margin-bottom: 30px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  & > button {
    width: 180px;
    padding: 15px;

    outline: none;
    background-color: ${COLOR.white};
    border-radius: 10px;
    border: 1px solid ${COLOR.line};
    cursor: pointer;
    &:hover {
      background-color: ${COLOR.offWhite};
    }
    &:active {
      background-color: ${COLOR.line};
      border: 1px solid ${COLOR.primary2};
    }
  }
  & img {
    width: 100%;
    height: 100%;

    -webkit-user-drag: none;
  }
`;
