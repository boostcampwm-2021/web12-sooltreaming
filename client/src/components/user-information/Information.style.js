import styled from 'styled-components';
import { COLOR, INPUT_STYLE } from '@constant/style';

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

export const InformationSpan = styled.span`
  font-weight: bold;
`;

export const Header = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > h2 {
    padding: 0;
    margin: 30px 0 0 15px;
    color: ${COLOR.titleActive};
    user-select: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & span {
    color: ${COLOR.point};
  }
`;

export const DeleteChangePressSection = styled.div`
  width: 640px;
  padding: 50px 70px;
  margin-bottom: 30px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  & > button {
    width: 180px;

    outline: none;
    background-color: ${COLOR.white};
    border-radius: 10px;
    border: 0px solid ${COLOR.line};
    cursor: pointer;
  }
  & img {
    width: 100%;
    height: 100%;

    -webkit-user-drag: none;
  }
`;

export const CheckPressSection = styled.div`
  width: 640px;
  padding: 30px 30px;
  margin-bottom: 10px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  & > button {
    width: 200px;

    outline: none;
    background-color: ${COLOR.white};
    border-radius: 10px;
    border: 0px solid ${COLOR.line};
    cursor: pointer;
  }

  & img {
    width: 100%;
    height: 100%;

    -webkit-user-drag: none;
  }
`;

export const HistoryData = styled.div`
  width: 640px;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;

  justify-content: space-around;
  align-items: center;

  p {
    margin: 8px;
  }
`;

export const ChangeNicknameData = styled.div`
  width: 640px;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;

  justify-content: space-around;
  align-items: center;
`;

export const NewNicknameInput = styled.input`
  ${INPUT_STYLE}
  width: 100%;
  max-width: 500px;
  height: 60px;
  padding: 0 30px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  border-radius: 100px;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
`;
