import styled from 'styled-components';
import { COLOR, BTN_STYLE } from '@constant/style';

export const Contents = styled.div`
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: relative;

  .host {
    span {
      font-weight: 600;
      color: ${COLOR.black};
    }
  }

  .random-pick {
    span {
      font-weight: 600;
      color: ${COLOR.error3};
    }
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
