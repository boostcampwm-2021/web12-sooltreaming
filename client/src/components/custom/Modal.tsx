import React from 'react';
import { Wrapper, ContentDiv } from '@components/custom/Modal.style';

export type ModalPosType = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};
type ModalPropTypes = {
  children: any;
  isOpen: boolean;
  renderCenter?: boolean;
  isRelative?: boolean;
  relativePos?: ModalPosType;
  absolutePos?: ModalPosType;
};

const Modal: React.FunctionComponent<ModalPropTypes> = ({
  children,
  isOpen,
  renderCenter = false,
  isRelative = true,
  relativePos = {},
  absolutePos = {},
}) => {
  if (!isOpen) return <></>;
  if (!isRelative)
    return (
      <ContentDiv renderCenter={renderCenter} pos={absolutePos}>
        {children}
      </ContentDiv>
    );
  return (
    <Wrapper pos={relativePos}>
      <ContentDiv renderCenter={renderCenter} pos={absolutePos}>
        {children}
      </ContentDiv>
    </Wrapper>
  );
};

export default Modal;
