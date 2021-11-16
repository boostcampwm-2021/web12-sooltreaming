import styled from 'styled-components';
import { COLOR, INPUT_STYLE } from '@constant/style';

export const Wrapper = styled.div`
  width: 83px;
  height: 83px;
  flex: 0 0 auto;

  & > img {
    width: 100%;
    -webkit-user-drag: none;
  }
  & > div {
    width: 60px;
    height: 60px;
    margin: 18px 23px 5px 0;
    position: relative;
    top: -100%;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 25px;
    color: ${COLOR.white};
    user-select: none;
  }
`;
