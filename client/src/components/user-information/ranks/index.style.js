import styled from 'styled-components';
import { COLOR } from '@constant/style';

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    flex: 0 0 auto;
    width: 90px;
    margin-bottom: 2.5rem;
  }

  .announce p {
    font-weight: 600;

    span {
      font-weight: 600;
      color: ${COLOR.error};
    }
  }
`;

export const RankContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  justify-content: center;
  margin: 2rem 0;
`;
