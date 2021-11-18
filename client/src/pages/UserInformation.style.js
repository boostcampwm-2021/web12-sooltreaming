import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${COLOR.background};
`;

export const MyPageHeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 70px;
  padding: 0 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${COLOR.titleActive};
  background-color: ${COLOR.primary2};

  img {
    position: absolute;
    width: 1.5rem;
    left: 20px;

    &:hover {
      cursor: pointer;
      width: 1.3rem;
    }
  }
`;

export const MyPageHeader = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${COLOR.titleActive};
  user-select: none;
  white-space: nowrap;
`;

export const MyPageSecondHeaderWrapper = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  width: 100vw;
  height: 50px;
  padding: 0 30px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  color: ${COLOR.titleActive};
  background-color: ${COLOR.primary2};
`;

export const MyPageSecondHeader = styled.div`
  display: inline-flex;
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR.titleActive};
  user-select: none;
  white-space: nowrap;

  p {
    display: flex;
    width: 86px;
    height: 46px;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin: 0 16px;
    color: ${COLOR.placeholder};
    cursor: pointer;

    &.on {
      color: ${COLOR.titleActive};
      font-weight: 600;
      border-bottom: 2px solid;
    }
  }
`;

export const MainDataWrapper = styled.div`
  padding-top: 120px;
`;
