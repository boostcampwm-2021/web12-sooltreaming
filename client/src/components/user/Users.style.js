import styled from 'styled-components';
import { COLOR, BTN_STYLE } from '@constant/style';

export const MenuBox = styled.div`
  flex: 1 1 auto;
  padding: 0 20;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.primary2};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
    height: 16px;
    border-radius: 10px;
    background: ${COLOR.line};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR.primary3};
    border-radius: 10px;
  }
`;

export const UserList = styled.li`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLOR.white};
  list-style: none;
  padding: 10px;
  & > div {
    display: flex;
  }
`;

export const Profile = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  & > img {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    -webkit-user-drag: none;
    user-select: none;
    margin-right: 10px;
  }
  & > div {
    margin: auto 0;
  }
`;

export const VoteButton = styled.button`
  ${BTN_STYLE}
  width: 80px;
  padding: 3px 0;
  margin-right: 10px;
`;

export const ReqFriendButton = styled.button`
  ${BTN_STYLE}
  width: 30px;
`;
