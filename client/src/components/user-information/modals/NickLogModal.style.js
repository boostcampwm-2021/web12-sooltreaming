import styled from 'styled-components';
import { COLOR, INPUT_STYLE } from '@constant/style';

export const Header = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

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

export const CheckPressSection = styled.div`
  width: 640px;
  padding: 30px 30px;
  margin-bottom: 10px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  & > button {
    width: 200px;

    outline: none;
    background-color: ${COLOR.white};
    border-radius: 10px;
    border: 0px solid ${COLOR.line};
    cursor: pointer;
  }

  & img {
    width: 100%;
    height: 100%;

    -webkit-user-drag: none;
  }
`;

export const HistoryData = styled.div`
  width: 640px;
  height: 200px;
  padding: 0px;
  display: flex;
  flex-direction: column;

  align-items: center;

  overflow-x: hidden;
  overflow-y: scroll;

  p {
    margin: 0.5rem;
  }

  p:first-child {
    margin-top: auto;
  }

  p:last-child {
    margin-bottom: auto;
  }

  &::-webkit-scrollbar {
    width: 4px;
    height: 16px;
    border-radius: 10px;
    background: ${COLOR.line};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR.primary3};
    border-radius: 10px;
  }
`;

export const AcceptIconWrapper = styled.div`
  cursor: pointer;

  path:first-child:hover {
    fill: ${COLOR.primary3};
  }

  path:first-child:active {
    fill: 10px solid ${COLOR.titleActive};
  }
`;
