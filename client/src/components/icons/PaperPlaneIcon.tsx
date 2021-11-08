import React from 'react';
import type { iconPropsType } from '@components/icons';

const PaperPlaneIcon = ({ width, height, fill, stroke }: iconPropsType): React.ReactElement => {
  return (
    <svg
      width={width ?? 24}
      height={height ?? 24}
      viewBox="0 0 24 24"
      fill={fill ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 2L11 13"
        stroke={stroke ?? '#9DB589'}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke={stroke ?? '#9DB589'}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default PaperPlaneIcon;
