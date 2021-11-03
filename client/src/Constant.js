import { css } from 'styled-components';

export const COLOR = {
  primary1: '#BED297',
  primary2: '#EBEFD6',
  primary3: '#9DB589',
  error: '#FF8988',
  titleActive: '#176842',
  body: '#5C5C5C',
  lable: '#888888',
  placeholder: '#888888',
  line: '#D9DBC8',
  background: '#FCFFFC',
  white: '#FFFFFF',
  offWhite: '#F6F6F6',
  point: '#A06000',
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
