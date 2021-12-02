import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const LineContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 70px;
  padding: 0 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${COLOR.titleActive};
  background-color: ${COLOR.primary2};
`;

export const LogoLink = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: ${COLOR.titleActive};

  & > img {
    width: 53px;
    height: 51px;
    -webkit-user-drag: none;
  }
  & > span {
    margin-left: 10px;
    font-weight: 700;
    font-size: 20px;
    user-select: none;
  }
`;

export const UserLink = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  // human Icon
  .User-Profile {
    display: inline-block;
    width: 45px;
    height: 45px;
    margin: 0 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${COLOR.white};
    border-radius: 50%;
    border: 2px solid ${COLOR.line};
    overflow: hidden;

    & > img {
      width: 100%;
      height: 100%;
    }
  }

  & > span {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-weight: bold;
    font-size: 16px;
    line-height: 30px;
    cursor: pointer;
    margin-right: 16px;
  }
`;

export const RightBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoutContainer = styled.a`
  cursor: pointer;

  &:hover svg {
    width: 110%;
    height: 110%;
  }
`;
