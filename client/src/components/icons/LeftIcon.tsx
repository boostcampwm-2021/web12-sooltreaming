import React from 'react';
import type { iconPropsType } from '@components/icons';

const LeftIcon = ({
  className,
  width,
  height,
  fill,
  stroke,
}: iconPropsType): React.ReactElement => {
  return (
    <svg
      width={width ?? 24}
      height={height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 20L8 12L16 4"
        stroke={stroke ?? '#222222'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LeftIcon;
