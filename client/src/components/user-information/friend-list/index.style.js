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
  flex-wrap: wrap;
`;

export const Header = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > h2 {
    padding: 0;
    margin: 30px 0 0 15px;
    color: ${COLOR.titleActive};
    user-select: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & span {
    color: ${COLOR.point};
  }
`;

export const RequestData = styled.div`
  width: 640px;
  padding: 20px 20px;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  overflow-x: hidden;
  white-space: nowrap;

  h2 {
    padding: 0;
    margin: 25px;
    color: ${COLOR.titleActive};
    user-select: none;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .application,
  .request {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 8px 0px;
  }

  .draggable-box {
    overflow-x: scroll;
    display: flex;
    white-space: nowrap;

    &:active {
      cursor: pointer;
    }

    &::-webkit-scrollbar {
      display: none;
    }

    > * {
      display: block;
    }
  }
`;

export const PendingFriend = styled.div`
  width: 250px;
  height: 70px;
  margin: 8px 0px;
  padding: 0 20px;
  border: 1px solid ${COLOR.primary1};

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px;
  white-space: nowrap;

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
    display: flex;
    flex-direction: column;
    overflow: hidden;
    cursor: pointer;
  }
`;

export const Xbutton = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;
  cursor: pointer;
`;

export const InfoContainer = styled.div`
  width: 600px;
  height: 665px;
`;
