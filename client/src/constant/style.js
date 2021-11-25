import { css } from 'styled-components';

export const Z_INDEX = {
  closeUp: 0,
  camOn: 10,
  camOff: 20,
  nickname: 25,
  question: 30,
  cheers: 40,
  modal: 50,
  updownNum: 55,
  toast: 60,
};

export const COLOR = {
  primary1: '#BED297',
  primary2: '#EBEFD6',
  primary3: '#9DB589',
  error: '#FF8988',
  error2: '#E26664',
  error3: '#D43E3C',
  lightError: '#FFD4D3',
  darkError: '#CD6766',
  titleActive: '#006737',
  body: '#5C5C5C',
  label: '#888888',
  placeholder: '#888888',
  line: '#D9DBC8',
  background: '#FCFFFC',
  white: '#FFFFFF',
  offWhite: '#F6F6F6',
  point: '#A06000',
  black: '#000000',
  disabled: '#EBEFD6',
};

export const INPUT_STYLE = css`
  padding: 0;
  margin: 0;
  border: 1px solid ${COLOR.line};
  outline: none;
  color: #222222;
  &:focus {
    border: 1px solid ${COLOR.primary1};
  }
`;

export const BTN_STYLE = css`
  padding: 0;
  margin: 0;
  background-color: ${COLOR.primary1};
  color: ${COLOR.white};
  border: 2px solid transparent;
  cursor: pointer;

  &:hover {
    background-color: ${COLOR.primary3};
  }
  &:focus {
    border: 2px solid ${COLOR.primary2};
  }
  &:disabled {
    background-color: ${COLOR.primary2};
  }
`;

export const CANCEL_BTN_STYLE = css`
  padding: 0;
  margin: 0;
  background-color: ${COLOR.error};
  color: ${COLOR.white};
  border: 2px solid transparent;
  cursor: pointer;

  &:hover {
    background-color: ${COLOR.darkError};
  }
  &:focus {
    border: 2px solid ${COLOR.lightError};
  }
  &:disabled {
    background-color: ${COLOR.lightError};
  }
`;

export const BOX_SHADOW = css`
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px #ccc;
`;
