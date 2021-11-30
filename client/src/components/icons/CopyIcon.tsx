import React from 'react';
import type { IconPropType } from '@ts-types/components/icons';

const CopyIcon = ({ width, height, fill, stroke }: IconPropType): React.ReactElement => {
  return (
    <svg
      width={width ?? '17'}
      height={height ?? '17'}
      viewBox="0 0 17 17"
      fill={fill ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.83333 6.375H9.20833C9.99074 6.375 10.625 7.00926 10.625 7.79167V14.1667C10.625 14.9491 9.99074 15.5833 9.20833 15.5833H2.83333C2.05093 15.5833 1.41667 14.9491 1.41667 14.1667V7.79167C1.41667 7.00926 2.05093 6.375 2.83333 6.375Z"
        stroke={stroke ?? 'black'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4583 10.625H14.1666C14.5423 10.625 14.9026 10.4757 15.1683 10.2101C15.434 9.94438 15.5833 9.58405 15.5833 9.20832V2.83332C15.5833 2.4576 15.434 2.09727 15.1683 1.83159C14.9026 1.56591 14.5423 1.41666 14.1666 1.41666H7.79158C7.41586 1.41666 7.05553 1.56591 6.78985 1.83159C6.52417 2.09727 6.37492 2.4576 6.37492 2.83332V3.54166"
        stroke={stroke ?? 'black'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CopyIcon;
