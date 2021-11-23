import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const RowBox = styled.div`
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
  align-items: center;
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

export const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
