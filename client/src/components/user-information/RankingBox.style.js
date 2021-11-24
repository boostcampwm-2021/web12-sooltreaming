import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const PersonalRankBox = styled.div`
  display: flex;
  align-items: space-between;
  width: 100%;
  padding: 15px;
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

export const RankData = styled.div`
  display: flex;
  flex-direction: column;
  height: 280px;
  margin: 40px 20px 0px 20px;
  width: 350px;
  overflow-y: scroll;
  div {
    display: flex;
    justify-content: space-between;
  }

  .me {
    background-color: ${COLOR.primary2};
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
