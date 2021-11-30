import styled from 'styled-components';
import { BTN_STYLE, CANCEL_BTN_STYLE, INPUT_STYLE, BOX_SHADOW } from '@constant/style';

export const ModalContents = styled.div`
  width: 640px;
  padding: 20px 20px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NewNicknameInput = styled.input`
  ${INPUT_STYLE}
  width: 300px;
  height: 60px;
  padding: 0 30px;
  margin: 0 10px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  &:focus {
    ${BOX_SHADOW}
  }
`;

const imageSize = 125;
const imagePad = 12.5;
export const ImageContainer = styled.div`
  width: ${imageSize + imagePad * 2}px;
  height: ${imageSize + imagePad * 2}px;
  padding: ${imagePad}px;
  margin: 0 10px;
  background-image: url('/images/profileBox.svg');
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
  }
  input {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;
export const DeleteBox = styled.div`
  position: absolute;
  margin-top: ${-imageSize - 20}px;
  margin-right: ${-imageSize - 20}px;
  cursor: pointer;
`;

export const ButtonContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
`;
const buttonMaker = (buttonStyle) => styled.button`
  ${buttonStyle}
  ${BOX_SHADOW}
  width: 120px;
  padding: 10px;
  margin: 0 10px;
  border-radius: 100px;
`;
export const AcceptButton = buttonMaker(BTN_STYLE);
export const CloseButton = buttonMaker(CANCEL_BTN_STYLE);
