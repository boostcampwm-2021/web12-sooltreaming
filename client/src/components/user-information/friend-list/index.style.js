import styled from 'styled-components';

export const FriendsContainer = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-auto-rows: auto;
  gap: 10px;
`;
