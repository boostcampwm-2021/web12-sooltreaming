import styled from 'styled-components';
import { COLOR, BTN_STYLE, CANCLE_BTN_STYLE } from '@constant/style';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${COLOR.background};
`;

export const Contents = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 940px) {
    flex-direction: column;
  }
`;

export const PreviewCamera = styled.video`
  max-width: 469px;
  width: 100%;
  height: 250px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 30px;

  border: 1px solid black;
`;

export const ControlBox = styled.div`
  height: 250px;

  display: flex;
  justify-content: center;
  align-items: center;

  & > section {
    height: 100%;
    margin: 0 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    & > div {
      height: 65px;
    }
  }
`;

export const LineBox = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 50px;
`;

const DefaultButton = styled.button`
  width: 300px;
  height: 50px;
  margin-top: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 32px;
  font-weight: 500px;
  border-radius: 100px;

  padding: 30px;
  margin: 30px;
`;

export const CancelButton = styled(DefaultButton)`
  ${CANCLE_BTN_STYLE}
`;

export const EnterButton = styled(DefaultButton)`
  ${BTN_STYLE}
`;
