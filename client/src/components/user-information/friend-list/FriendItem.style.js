import styled from 'styled-components';
import { COLOR, BTN_STYLE, CANCEL_BTN_STYLE, BOX_SHADOW } from '@constant/style';

export const Friend = styled.div`
  ${BOX_SHADOW};
  border: 1px solid ${COLOR.primary1};

  background-color: ${COLOR.white};
  padding: 15px;
  margin: 15px;

  display: flex;

  justify-content: space-between;
  align-items: center;

  min-width: 250px;
  width: 250px;
  height: 60px;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const LeftBox = styled.div`
  display: inline-flex;
  align-items: center;

  img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
    border-radius: 3px;
  }
`;

export const RightBox = styled.div`
  button {
    width: 60px;
    height: 20px;
    border-radius: 5px;
  }

  .cancel-button {
    ${CANCEL_BTN_STYLE}
  }

  .add-button {
    ${BTN_STYLE}
  }

  .home-button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.5rem;
    height: 1.5rem;

    ${BTN_STYLE}
  }
`;
