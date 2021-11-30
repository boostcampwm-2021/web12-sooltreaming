import styled from 'styled-components';
import { COLOR, BTN_STYLE, CANCEL_BTN_STYLE, BOX_SHADOW } from '@constant/style';

export const OpenListButton = styled.button`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  width: 129px;
  height: 129px;

  border: none;
  outline: none;
  background-color: transparent;
  background-image: url('/images/requestFriend.png');

  &:hover {
    cursor: pointer;
    padding: 2px;
    right: 2.1rem;
    bottom: 2.1rem;
  }
`;

export const FriendList = styled.ul`
  width: 640px;
  margin: 0 0 40px 0;
  padding: 0;
  & > li {
    min-width: 250px;
    width: 250px;
  }

  display: flex;
  align-items: center;

  overflow-x: scroll;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    height: 5px;
    border-radius: 10px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR.primary3};
    border-radius: 10px;
  }
`;

const buttonMaker = (buttonStyle) => styled.button`
  ${buttonStyle}
  ${BOX_SHADOW}
  min-width: 30px;
  padding: 0 5px;
  margin: 0 3px;
  border-radius: 100px;
`;
export const AcceptButton = buttonMaker(BTN_STYLE);
export const DenyButton = buttonMaker(CANCEL_BTN_STYLE);
