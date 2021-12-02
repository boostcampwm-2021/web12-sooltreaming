import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const DeleteFriendPressSection = styled.div`
  padding: 10px;

  display: flex;
  justify-content: center;
  margin: 0;
  align-items: center;
  & > div {
    margin: 0 10px;
  }
`;

export const DeleteIconWrapper = styled.div`
  cursor: pointer;
  path:first-child:hover {
    fill: ${COLOR.error2};
  }

  path:first-child:active {
    fill: ${COLOR.error3};
  }
`;

export const CancelIconWrapper = styled.div`
  cursor: pointer;
  path:first-child:hover {
    fill: ${COLOR.primary3};
  }

  path:first-child:active {
    fill: 10px solid ${COLOR.titleActive};
  }
`;

export const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;
