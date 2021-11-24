import React from 'react';
import { RelativeBox, AbsoluteBox } from '@components/custom/Modal.style';

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
      <AbsoluteBox renderCenter={renderCenter} pos={absolutePos}>
        {children}
      </AbsoluteBox>
    );
  return (
    <RelativeBox pos={relativePos}>
      <AbsoluteBox renderCenter={renderCenter} pos={absolutePos}>
        {children}
      </AbsoluteBox>
    </RelativeBox>
  );
};

export default Modal;
