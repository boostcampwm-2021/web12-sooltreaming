import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const Container = styled.div`
  flex: 0 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const PersonalRankBox = styled.div`
  width: 350px;
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
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
    overflow-x: hidden;
    overflow-y: hidden;
    margin-right: 8px;

    .nickname span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      user-select: none;
      -webkit-user-drag: none;
    }
  }
`;

export const RankNum = styled.div`
  color: ${COLOR.titleActive};
  margin-right: 2rem;
  font-weight: bold;
`;

export const RankData = styled.div`
  flex: 1 0 auto;
  height: 100%;
  flex-direction: column;
  overflow-y: scroll;
  margin: 0 2rem;
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
