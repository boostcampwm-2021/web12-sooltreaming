import styled from 'styled-components';
import { COLOR, BTN_STYLE, CANCLE_BTN_STYLE } from '@constant/style';

export const Friend = styled.div`
  display: inline-flex;
  width: 250px;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  margin: 8px;
  padding: 0 20px;
  border: 1px solid ${COLOR.primary1};

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .left-items {
    display: inline-flex;
    align-items: center;
    overflow: hidden;

    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 1rem;
      border-radius: 5px;
    }
  }

  .right-items {
    cursor: pointer;

    button {
      width: 60px;
      heigth: 20px;
      border-radius: 5px;
    }

    .cancle-button {
      ${CANCLE_BTN_STYLE}
    }

    .add-button {
      ${BTN_STYLE}
    }

    .home-button {
      display: flex;
      align-items: center;
      justify-content: center;

      margin: 1rem;

      width: 1.5rem;
      height: 1.5rem;
      margin-right: 1rem;
      border-radius: 5px;

      ${BTN_STYLE}
    }
  }
`;
