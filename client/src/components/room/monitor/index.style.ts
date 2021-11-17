import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: ${COLOR.background};

  .closeup {
    position: absolute;
    z-index: 0;
    max-width: 100%;
    width: 100%;
    height: 100%;
  }

  .mini {
    width: 200px;
    height: 200px;
  }
`;

export const VideoWrapper = styled.div<{ count: number }>`
  position: relative;
  min-width: 200px;
  max-width: calc(100% / ${(props) => (props.count === 2 ? 2 : Math.ceil(props.count / 2))});
  min-height: 100px;
  width: ${(props) => (props.count > 2 ? 50 : 100)}%;
  height: ${(props) => (props.count > 2 ? 50 : 100)}%;
  z-index: 1;
  padding: 10px;
`;

export const Video = styled.video<{ count: number }>`
  position: absolute;
  width: 100%;
  height: 100%;

  padding: 10px;
`;

export const Image = styled.img<{
  count: number;
  isVideoOn: any;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  visibility: ${(props) => (props.isVideoOn ? 'hidden' : 'block')};

  padding: 10px;
`;