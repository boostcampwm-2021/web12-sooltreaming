import styled from 'styled-components';
import { COLOR, INPUT_STYLE } from '@constant/style';

export const DeleteChangePressSection = styled.div`
  width: 640px;
  padding: 30px 30px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
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

export const RejectIconWrapper = styled.div`
  cursor: pointer;
  path:first-child:hover {
    fill: ${COLOR.error2};
  }

  path:first-child:active {
    fill: ${COLOR.error3};
  }
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

const profileSquareSize = 125;
export const ProfileSquare = styled.div`
  width: ${profileSquareSize}px;
  height: ${profileSquareSize}px;
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

export const DeleteBox = styled.div`
  position: absolute;
  margin-top: ${-profileSquareSize - 20}px;
  margin-right: ${-profileSquareSize - 20}px;
  cursor: pointer;
`;
