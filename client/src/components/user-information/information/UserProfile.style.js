import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 300px;

  border-bottom: 1px solid ${COLOR.offWhite};
`;

export const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ImgSlot = styled.div`
  width: 175px;
  height: 175px;
  padding: 15px;

  background-color: ${COLOR.offWhite};

  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  border-radius: 10px;

  img {
    width: 144px;
    height: 144px;
  }
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 2rem;

  p {
    font-size: 24px;
  }
`;

export const ButtonsContainer = styled.button`
  background-color: none;
  background: none;
  border: none;
  margin: 0 5px;
`;
