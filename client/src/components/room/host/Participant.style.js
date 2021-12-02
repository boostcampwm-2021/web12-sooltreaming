import styled from 'styled-components';
import { COLOR, BOX_SHADOW } from '@constant/style';

export const RowBox = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLOR.white};
  list-style: none;

  ${BOX_SHADOW}
  padding: 15px;
  margin-bottom: 15px;
  & > div {
    display: flex;
  }
`;

export const Profile = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
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

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    user-select: none;
    -webkit-user-drag: none;
  }
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
