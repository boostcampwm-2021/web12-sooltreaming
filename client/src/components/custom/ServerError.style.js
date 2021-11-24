import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.background};
`;

export const StatusText = styled.div`
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 60px;
  color: ${COLOR.error};
  user-select: none;

  & > span {
    color: ${COLOR.titleActive};
  }
`;

export const GuideText = styled.div`
  font-weight: bold;
  font-size: 30px;
  color: ${COLOR.primary3};
  user-select: none;
`;
