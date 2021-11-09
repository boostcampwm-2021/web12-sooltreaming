import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Column = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const VideoBox = styled.video`
  max-width: 469px;
  width: 100%;
  height: 250px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 30px;

  border: 1px solid black;
`;
