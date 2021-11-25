import styled from 'styled-components';
import { COLOR, INPUT_STYLE } from '@constant/style';

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
  margin-left: 2rem;

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
  &:hover {
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
  &:hover {
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

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    height: 30px;
    margin: 0;
  }
`;

export const InformationSpan = styled.span`
  font-weight: bold;
`;

export const DeleteChangePressSection = styled.div`
  width: 640px;
  padding: 30px 30px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const DeleteFriendPressSection = styled.div`
  width: 640px;
  padding: 30px 30px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const NicknameChangeAcceptIconWrapper = styled.div<{
  nickChanged: boolean;
  imgChanged: boolean;
}>`
  cursor: pointer;

  path:first-child:hover {
    fill: ${COLOR.primary3};
  }

  path:first-child:active {
    fill: 10px solid ${COLOR.titleActive};
  }

  ${(props) =>
    props.nickChanged || props.imgChanged
      ? ''
      : `path:first-child{fill:${COLOR.disabled}}; path:first-child:hover{fill:${COLOR.disabled}}; path:first-child:active{fill:${COLOR.disabled}}`};
`;

export const NicknameChangeIconWrapper = styled.div`
  cursor: pointer;
  path:first-child:hover {
    fill: ${COLOR.primary3};
  }

  path:first-child:active {
    fill: 10px solid ${COLOR.titleActive};
  }
`;

export const RejectIconWrapper = styled.div`
  cursor: pointer;
  path:first-child:hover {
    fill: ${COLOR.error2};
  }

  path:first-child:active {
    fill: ${COLOR.error3};
  }
`;

export const DeleteIconWrapper = styled.div`
  cursor: pointer;
  path:first-child:hover {
    fill: ${COLOR.error2};
  }

  path:first-child:active {
    fill: ${COLOR.error3};
  }
`;

export const CancelIconWrapper = styled.div`
  cursor: pointer;
  path:first-child:hover {
    fill: ${COLOR.primary3};
  }

  path:first-child:active {
    fill: 10px solid ${COLOR.titleActive};
  }
`;

export const ChangeData = styled.div`
  width: 640px;
  padding: 20px 20px;
  display: flex;
  flex-direction: row;

  justify-content: space-evenly;
  align-items: center;
`;

export const NewNicknameInput = styled.input`
  ${INPUT_STYLE}
  width: 100%;
  max-width: 300px;
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

export const ProfileSquareWrapper = styled.div`
  width: 150px;
  height: 150px;
  background-image: url('/images/profileBox.svg');
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileSquare = styled.div`
  width: 125px;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 125px;
    height: 125px;
  }
  input {
    position: absolute;
    width: 125px;
    height: 125px;
  }
`;

export const XButtonWrapper = styled.div`
  position: absolute;
  top: 110px;
  left: 218px;
  cursor: pointer;
`;
