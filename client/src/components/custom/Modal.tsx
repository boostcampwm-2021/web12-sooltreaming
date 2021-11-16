import React, { ReactNode } from 'react';
import { Wrapper, ContentDiv } from './Modal.style';

const MODAL_CONTENT_KEY = 'ModalContent';
export const ModalContent: React.FC = ({ children }) => {
  return <div key={MODAL_CONTENT_KEY}>{children}</div>;
};

export type ModalPosType = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};
type ModalPropTypes = {
  children: ReactNode[];
  isOpen: boolean;
  relativePos?: ModalPosType;
  absoultePos?: ModalPosType;
};

const Modal: React.FC<ModalPropTypes> = ({
  children,
  isOpen,
  relativePos = {},
  absoultePos = {},
}) => {
  if (!children?.length) <></>;

  const [contentChildren, otherChildren] = [...children].reduce(
    ([conts, others]: Array<ReactNode[]>, cur: ReactNode) => {
      // Verify Type (Component)
      const typeFunc = (cur as { type: Function })?.type;
      const isTargetType =
        typeFunc && typeof typeFunc === 'function' && typeFunc.name === MODAL_CONTENT_KEY;
      if (!isTargetType) return [conts, [...others, cur]];
      // Check Children
      const grandChildren = (cur as { props: { children: ReactNode | ReactNode[] } })?.props
        ?.children;
      if (!grandChildren) return [conts, others];
      return [[...conts, grandChildren], others];
    },
    [[], []],
  );

  return (
    <>
      {otherChildren}
      {isOpen && (
        <Wrapper pos={relativePos}>
          <ContentDiv pos={absoultePos}>{contentChildren}</ContentDiv>
        </Wrapper>
      )}
    </>
  );
};

export default Modal;
