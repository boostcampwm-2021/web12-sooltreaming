import styled from 'styled-components';
import { COLOR, BTN_STYLE, BOX_SHADOW } from '@constant/style';

export const MenuBox = styled.div`
  flex: 1 1 auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.primary2};
  overflow-x: hidden;
  overflow-y: scroll;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  height: 50px;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLOR.white};
  list-style: none;
  ${BOX_SHADOW}
  margin-bottom: 15px;
  padding: 15px;

  & > div {
    display: flex;
  }
`;

export const Profile = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-right: 8px;

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

  .nickname {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    user-select: none;
    -webkit-user-drag: none;
  }
`;

export const VoteButton = styled.button`
  ${BTN_STYLE}
  width: 80px;
  padding: 3px 0;
  margin-right: 10px;
  border-radius: 5px;
`;

export const ReqFriendButton = styled.button`
  ${BTN_STYLE}
  width: 30px;
  border-radius: 5px;
`;
