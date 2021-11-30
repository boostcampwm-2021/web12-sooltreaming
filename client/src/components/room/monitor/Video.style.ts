import styled from 'styled-components';
import { COLOR, Z_INDEX } from '@constant/style';

export const CameraContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: ${Z_INDEX.camOn};
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
`;

export const Camera = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #c4c4c4;
`;

export const ImageBox = styled.div<{ isVideoOn: any }>`
  background-color: ${COLOR.body};
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: ${(props) => (props.isVideoOn ? 'hidden' : 'block')};
  z-index: ${Z_INDEX.camOff};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileImage = styled.img`
  height: 80%;
  object-fit: contain;
  border-radius: 50%;
`;

export const Name = styled.span`
  display: flex;
  position: absolute;
  bottom: 10px;
  background-color: ${COLOR.black};
  color: ${COLOR.white};
  padding: 5px 7px;
  opacity: 0.5;
  z-index: ${Z_INDEX.nickname};

  & > svg {
    margin-left: 7px;
    &:last-child {
      position: absolute;
      right: 6px;
    }
  }
`;
