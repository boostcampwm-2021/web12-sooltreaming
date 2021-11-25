import styled, { css } from 'styled-components';
import { COLOR, BOX_SHADOW } from '@constant/style';

const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FullScreen = styled.div`
  ${flexColumnCenter}

  width: 100%;
  min-width: 400px;
  height: 100%;
  overflow: hidden;

  background-color: ${COLOR.background};
`;

export const LogoBox = styled.div`
  ${flexColumnCenter}

  & > img {
    width: 250px;
    margin-bottom: 10px;
    -webkit-user-drag: none;
  }
  & > span {
    font-weight: 700;
    font-size: 48px;
    user-select: none;
    color: ${COLOR.titleActive};
  }
`;

export const ButtonsDiv = styled.div`
  ${flexColumnCenter}
  margin: 50px 0;
`;

export const LoginLink = styled.a`
  width: 312px;
  height: 65px;
  padding: 0;
  margin-bottom: 30px;
  overflow: hidden;

  display: flex;
  align-items: center;

  outline: none;
  border: none;
  cursor: pointer;
  ${BOX_SHADOW}

  & > img {
    width: 100%;
    -webkit-user-drag: none;
  }
`;

export const Title = styled.div`
  text-align: center;

  font-size: 48px;
  font-weight: 700;
  color: ${COLOR.titleActive};
  user-select: none;

  & > span {
    color: ${COLOR.point};
  }
`;
