import styled from 'styled-components';
import { COLOR, BTN_STYLE, CANCEL_BTN_STYLE } from '@constant/style';

export const SettingContainer = styled.div`
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
  box-shadow: 1px 1px 1px 1px #ccc;
  background-color: #c4c4c4;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 30px;
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
  min-width: 469px;
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
  ${CANCEL_BTN_STYLE}
`;

export const EnterButton = styled(DefaultButton)`
  ${BTN_STYLE}
  margin-right: 30px;
`;
