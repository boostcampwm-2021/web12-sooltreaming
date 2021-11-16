import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: ${COLOR.background};
`;

export const VideoWrapper = styled.div<{ count: number }>`
  position: relative;
  min-width: 200px;
  max-width: calc(100% / ${(props) => (props.count === 2 ? 2 : Math.ceil(props.count / 2))});
  min-height: 100px;
  width: ${(props) => (props.count > 2 ? 50 : 100)}%;
  height: ${(props) => (props.count > 2 ? 50 : 100)}%;

  padding: 10px;
`;

export const Video = styled.video<{ count: number }>`
  position: absolute;
  width: 100%;
  height: 100%;

  padding: 10px;
`;

export const Image = styled.img<{ count: number; isVideoOn: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isVideoOn ? 'none' : 'block')};

  padding: 10px;
`;
