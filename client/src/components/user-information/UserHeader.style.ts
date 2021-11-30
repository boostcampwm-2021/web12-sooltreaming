import styled, { css } from 'styled-components';
import { COLOR } from '@constant/style';

export const HeaderBox = styled.div`
  width: 100%;
  height: 70px;
  padding: 0 30px;
  flex: 0 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${COLOR.titleActive};
  background-color: ${COLOR.primary2};

  img {
    position: absolute;
    width: 1.5rem;
    left: 20px;

    &:hover {
      cursor: pointer;
      width: 1.3rem;
    }
  }
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${COLOR.titleActive};
  user-select: none;
  white-space: nowrap;
`;

export const SecondHeaderBox = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 30px;
  flex: 0 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  color: ${COLOR.titleActive};
  background-color: ${COLOR.primary2};
`;

export const MenuList = styled.div`
  display: inline-flex;
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR.titleActive};
  user-select: none;
  white-space: nowrap;
`;

const selectedMenu = css`
  color: ${COLOR.titleActive};
  font-weight: 600;
  border-bottom: 2px solid;
`;
const defaultMenu = css`
  color: ${COLOR.placeholder};
`;
export const MenuItem = styled.p<{ isSelected: boolean }>`
  display: flex;
  width: 86px;
  height: 46px;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin: 0 16px;
  cursor: pointer;

  ${(props) => (props?.isSelected ? selectedMenu : defaultMenu)};
`;
