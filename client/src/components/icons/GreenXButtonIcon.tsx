import React from 'react';
import type { IconPropType } from '@ts-types/components/icons';

const GreenXButtonIcon = ({
  className,
  width,
  height,
  fill,
  stroke,
}: IconPropType): React.ReactElement => {
  return (
    <svg
      width={width ?? 23}
      height={height ?? 23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="11.5455" cy="11.0634" rx="11.4545" ry="11.0634" fill="#BED297" />
      <path
        d="M15.3637 7.495L7.72729 14.8706"
        stroke={stroke ?? 'white'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.72729 7.495L15.3637 14.8706"
        stroke={stroke ?? 'white'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GreenXButtonIcon;
