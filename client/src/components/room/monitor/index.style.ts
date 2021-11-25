import styled from 'styled-components';
import { COLOR, Z_INDEX } from '@constant/style';

export const Monitor = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: ${COLOR.background};

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

export const CameraContainer = styled.div<{ count: number }>`
  position: relative;
  min-width: 200px;
  max-width: calc(100% / ${(props) => (props.count === 2 ? 2 : Math.ceil(props.count / 2))});
  min-height: 100px;
  width: ${(props) => (props.count > 2 ? 50 : 100)}%;
  height: ${(props) => (props.count > 2 ? 50 : 100)}%;
  z-index: ${Z_INDEX.camOn};
  padding: 10px;
`;

export const Camera = styled.video<{ count: number }>`
  position: absolute;
  top: 0;
  left: 0;
  padding: 11px;
  width: 100%;
  height: 100%;
`;

export const ProfileImage = styled.img<{
  count: number;
  isVideoOn: any;
}>`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  width: 100%;
  height: 100%;
  visibility: ${(props) => (props.isVideoOn ? 'hidden' : 'block')};
  z-index: ${Z_INDEX.camOff};
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
