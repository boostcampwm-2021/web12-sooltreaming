import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const Container = styled.div`
  width: 28%;
  height: 100%;
  margin: 0 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const PersonalRankBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.2rem;
  img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
    border-radius: 5px;
  }
  div {
    display: flex;
    justify-content: space-between;
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
  overflow-y: scroll;
  width: 100%;
  height: 100%;
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

export const RankTitle = styled.div`
  width: 50%;
  text-align: center;
  padding: 1.2rem 0;
  color: ${COLOR.titleActive};
  font-weight: bold;
  border-bottom: 1px solid ${COLOR.line};
`;
