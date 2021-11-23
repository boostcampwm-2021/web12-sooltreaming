import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const TimerContainer = styled.div`
  align-self: flex-end;
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
    margin: 16px 23px 7px 0;
    position: relative;
    top: -100%;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 25px;
    font-weight: bold;
    color: ${COLOR.white};
    user-select: none;
  }
`;
