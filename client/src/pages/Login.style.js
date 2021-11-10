import styled, { css } from 'styled-components';
import { COLOR, INPUT_STYLE, BTN_STYLE } from '@constant/style';

const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  ${flexColumnCenter}

  width: 100%;
  min-width: 400px;
  height: 100%;
  overflow: hidden;

  background-color: ${COLOR.background};
`;

export const LogoDiv = styled.div`
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
  margin: 40px 0;
`;

export const LoginButton = styled.button`
  width: 312px;
  height: 65px;
  padding: 0;
  margin-bottom: 20px;
  overflow: hidden;

  display: flex;
  align-items: center;

  outline: none;
  border: none;
  border-radius: 100px;
  cursor: pointer;

  & > img {
    width: 100%;
  }
`;

export const TitleDiv = styled.div`
  text-align: center;

  margin-bottom: 100px;
  font-size: 48px;
  font-weight: 700;
  color: ${COLOR.titleActive};
  user-select: none;

  & > span {
    color: ${COLOR.point};
  }
`;
