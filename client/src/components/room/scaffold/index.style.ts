import styled from 'styled-components';

export const Content = styled.div<{ isVote: boolean }>`
  padding-bottom: ${(props) => (props.isVote ? 0 : '30px')};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => (props.isVote ? 'row' : 'column')};
`;
