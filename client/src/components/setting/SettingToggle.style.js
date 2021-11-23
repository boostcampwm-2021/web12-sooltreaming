import styled from 'styled-components';

export const ToggleButton = styled.div`
  width: 45px;
  height: 45px;

  background-color: none;
  background: none;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    position: absolute;
    cursor: pointer;
    &:hover {
      padding: 2px;
    }
  }
`;
