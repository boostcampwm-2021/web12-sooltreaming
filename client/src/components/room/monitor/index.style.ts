import styled, { css } from 'styled-components';
import { COLOR, Z_INDEX } from '@constant/style';

const oneGrid = css`
  grid-template-columns: 1fr;
`;
const twoGrid = css`
  @media only screen and (max-width: 1100px) and (max-height: 700px) {
    grid-template-rows: 1fr 1fr;
  }
  @media only screen and (min-width: 1100px) and (min-height: 700px) {
    grid-template-columns: 1fr 1fr;
  }
  grid-gap: 10px;
`;
const fourGrid = css`
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;
const sixGrid = css`
  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
  @media only screen and (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  grid-gap: 10px;
`;
const nineGrid = css`
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5px;
`;

export const Monitor = styled.div<{ count: number }>`
  width: 100%;
  height: 100%;
  padding: 10px;

  display: grid;
  ${(props) => {
    const count = props.count;
    switch (count) {
      case 1:
        return oneGrid;
      case 2:
        return twoGrid;
      case 3:
      case 4:
        return fourGrid;
      case 5:
      case 6:
        return sixGrid;
      default:
        return nineGrid;
    }
  }}

  .closeup {
    position: absolute;
    z-index: ${Z_INDEX.closeUp};
    max-width: 100%;
    width: 100%;
    height: 100%;
  }

  .mini {
    width: 230px;
    height: 178px;
    align-self: flex-end;
  }
`;

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
  position: absolute;
  bottom: 10px;
  background-color: ${COLOR.black};
  color: ${COLOR.white};
  padding: 5px;
  opacity: 0.5;
  z-index: ${Z_INDEX.nickname};
`;
