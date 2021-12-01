import React from 'react';
import type { IconPropType } from '@ts-types/components/icons';

const XIcon = ({ className, width, height, fill, stroke }: IconPropType): React.ReactElement => {
  return (
    <svg
      className={className ?? ''}
      width={width ?? 17}
      height={height ?? 26}
      viewBox="0 0 17 26"
      fill={fill ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.83496 2C6.43161 6.88775 9.29539 12.1865 12.5302 17.3083C13.2572 18.4594 13.478 19.0115 14.5249 19.5349"
        stroke={stroke ?? '#FF0000'}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M14.525 7.01001C10.5362 12.6132 5.07092 17.5681 2 23.71"
        stroke={stroke ?? '#FF0000'}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default XIcon;
