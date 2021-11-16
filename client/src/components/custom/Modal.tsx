import React from 'react';
import { Wrapper, ContentDiv } from './Modal.style';

export type ModalPosType = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};
type ModalPropTypes = {
  children: any;
  isOpen: boolean;
  relativePos?: ModalPosType;
  absolutePos?: ModalPosType;
};

const Modal: React.FunctionComponent<ModalPropTypes> = ({
  children,
  isOpen,
  relativePos = {},
  absolutePos = {},
}) => {
  if (!isOpen) return <></>;
  return (
    <Wrapper pos={relativePos}>
      <ContentDiv pos={absolutePos}>{children}</ContentDiv>
    </Wrapper>
  );
};

export default Modal;
