import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const TitleH2 = styled.h2`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding: 30px 100px 15px 30px;
  color: ${COLOR.titleActive};
  user-select: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & span {
    color: ${COLOR.point};
  }
`;

export const PressSection = styled.div`
  width: 640px;
  padding: 50px 70px;

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
