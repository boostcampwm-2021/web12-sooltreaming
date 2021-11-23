import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  img {
    width: 150px;
    height: 125px;
  }
`;

export const FriendRankData = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  height: 280px;
  overflow-y: scroll;
  padding: 0 15px;
  div {
    display: flex;
    justify-content: space-between;
  }

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

export const DropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

export const FriendRankBox = styled.div`
  display: flex;
  align-items: space-between;
  width: 300px;
  padding: 10px 0;
  img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
    border-radius: 5px;
  }
`;

export const RankNum = styled.div`
  color: ${COLOR.titleActive};
  margin-right: 2rem;
  font-weight: bold;
`;
