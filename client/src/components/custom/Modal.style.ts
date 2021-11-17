import styled from 'styled-components';
import { COLOR, Z_INDEX } from '@constant/style';
import type { ModalPosType } from '@components/custom/Modal';

const getPositionCSS = (pos: ModalPosType) => {
  return Object.entries(pos)
    .map(([key, value]) =>
      ['top', 'left', 'right', 'bottom'].includes(key) ? `${key}: ${value};` : '',
    )
    .join('');
};

export const Wrapper = styled.div<{ pos: ModalPosType }>`
  position: relative;
  ${(props) => getPositionCSS(props.pos)}
`;

export const ContentDiv = styled.div<{ renderCenter: boolean; pos: ModalPosType }>`
  position: absolute;
  z-index: ${Z_INDEX.modal};
  ${(props) => getPositionCSS(props.pos)}
  padding: 10px;
  background-color: ${COLOR.background};
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5), 0px 2px 4px rgba(0, 0, 0, 0.25);
  ${(props) => (props.renderCenter ? 'transform:translate(-50%, -50%);' : '')}
`;
