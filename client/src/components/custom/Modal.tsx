import React from 'react';
import { RelativeBox, AbsoluteBox } from '@components/custom/Modal.style';
import type { ModalPropType } from '@ts-types/components/custom';

const Modal: React.FunctionComponent<ModalPropType> = ({
  children,
  isOpen,
  renderCenter = false,
  isRelative = true,
  relativePos = {},
  absolutePos = {},
}): React.ReactElement => {
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
