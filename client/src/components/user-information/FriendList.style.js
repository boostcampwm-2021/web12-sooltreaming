import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const RequestFriendBtn = styled.div`
  background-image: url('/images/requestFriend.png');
  width: 129px;
  height: 129px;

  position: absolute;
  right: 2rem;
  bottom: 2rem;

  &:hover {
    cursor: pointer;
    padding: 2px;
    right: 2.1rem;
    bottom: 2.1rem;
  }
`;

export const FriendWrapper = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Friend = styled.div`
  display: inline-flex;
  width: calc(95% / 3);
  height: 60px;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0px;
  padding: 0 20px;
  border: 1px solid ${COLOR.primary1};

  .left-items {
    display: inline-flex;
    align-items: center;
    overflow: hidden;

    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 1rem;
    }
  }

  .right-items {
    overflow: hidden;
  }
`;
