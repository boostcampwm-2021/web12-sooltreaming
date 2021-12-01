import styled from 'styled-components';
import { COLOR, BTN_STYLE } from '@constant/style';

export const Contents = styled.div<{ keyword: String }>`
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
      color: ${COLOR.body};
    }
  }

  .keyword {
    span {
      font-weight: 600;
      ${(props) =>
        props.keyword === '라이어' ? `color: ${COLOR.error3}` : `color: ${COLOR.titleActive}`};
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
