import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const Wrapper = styled.div<{ isSelf: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isSelf ? 'flex-end' : 'flex-start')};
`;

export const UserSection = styled.section<{ isSelf: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: ${(props) => (props.isSelf ? 'row-reverse' : 'row')};

  & > span {
    user-select: none;
  }
  & > span:last-child {
    font-size: 10px;
    margin: 2px;
  }
`;

export const CircleDiv = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  background-color: ${COLOR.placeholder};
  border: 2px solid ${COLOR.line};

  & > img {
    width: 30px;
    height: 30px;
    -webkit-user-drag: none;
    user-select: none;
  }
`;

export const NameSpan = styled.span`
  margin: auto 8px;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: ${COLOR.titleActive};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MsgContent = styled.p<{ isSelf: boolean }>`
  padding: 8px;
  margin: 12px 6px;

  border: 1px solid ${COLOR.primary1};
  border-radius: ${(props) => (props.isSelf ? '8px 0 8px 8px' : '0 8px 8px 8px')};
  color: ${(props) => (props.isSelf ? COLOR.white : COLOR.black)};
  background-color: ${(props) => (props.isSelf ? COLOR.primary1 : COLOR.white)};
`;
