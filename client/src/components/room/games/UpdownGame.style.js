import styled from 'styled-components';
import { COLOR, BTN_STYLE, Z_INDEX } from '@constant/style';

export const Contents = styled.div`
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: relative;

  img {
    position: absolute;
    top: 40px;
  }

  span {
    font-weight: 600;
    color: ${COLOR.body};
  }

  .random-num {
    position: relative;
    z-index: ${Z_INDEX.updownNum};
    left: 5px;
  }
`;

export const GameTitle = styled.div`
  width: 100%;
  font-weight: bold;
  color: ${COLOR.titleActive};
`;

export const GameStopButton = styled.button`
  ${BTN_STYLE};
  padding: 5px 10px;
  font-size: 15px;
`;
