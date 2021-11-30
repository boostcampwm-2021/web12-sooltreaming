import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageBox = styled.div`
  width: 175px;
  height: 175px;
  padding: 15px;

  background-color: ${COLOR.white};

  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  border-radius: 10px;

  img {
    width: 144px;
    height: 144px;
    -webkit-user-drag: none;
    border-radius: 5px;
  }
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
`;

export const Nickname = styled.div`
  width: 200px;
  margin: 10px 0 20px 0;
  padding-bottom: 10px;
  color: ${COLOR.body};
  font-size: 25px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
  -webkit-user-drag: none;

  border-bottom: 1px solid ${COLOR.line};
`;

export const ButtonsContainer = styled.div`
  width: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
