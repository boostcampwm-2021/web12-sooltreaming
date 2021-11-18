import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const TopWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  height: 300px;

  border-bottom: 1px solid ${COLOR.offWhite};
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileImgSlot = styled.div`
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

export const ProfileData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 24px;
  }
`;

export const ButtonsWrapper = styled.button`
  background-color: none;
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  &: hover {
    & > svg {
      padding: 2px;
    }
  }
  & > svg {
    pointer-events: none;
  }
`;

export const Button = styled.button`
  background-color: none;
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  &: hover {
    & > svg {
      padding: 2px;
    }
  }
  & > svg {
    pointer-events: none;
  }
`;

export const BottomWrapper = styled.div`
  padding-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    height: 30px;
    margin: 0.25em 0;
  }
`;
