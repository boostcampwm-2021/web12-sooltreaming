import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const DeleteFriendPressSection = styled.div`
  width: 640px;
  padding: 30px 30px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
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
