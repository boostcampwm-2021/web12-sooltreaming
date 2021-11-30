import styled from 'styled-components';
import { COLOR, BOX_SHADOW } from '@constant/style';

export const FriendItemBox = styled.li`
  ${BOX_SHADOW};
  height: 60px;
  padding: 0 15px;
  margin: 15px;

  border: 1px solid ${COLOR.primary1};
  background-color: ${COLOR.white};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftBox = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;

  & > img {
    flex: 0 0 auto;
    width: 32px;
    height: 32px;
    border-radius: 3px;
  }
  & > p {
    flex: 1;
    margin: 16px 5px 16px 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 20px;
  }
`;

export const RightBox = styled.div`
  flex: 0 0 auto;
`;
