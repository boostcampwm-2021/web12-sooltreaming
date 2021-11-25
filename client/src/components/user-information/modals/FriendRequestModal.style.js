import styled from 'styled-components';

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
