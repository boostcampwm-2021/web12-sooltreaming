import React from 'react';
import type { IconPropType } from '@ts-types/components/icons';

const ChatIcon = ({ className, width, height, fill, stroke }: IconPropType): React.ReactElement => {
  return (
    <svg
      className={className ?? ''}
      width={width ?? 34}
      height={height ?? 26}
      viewBox="0 0 34 26"
      fill={fill ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.3656 18.3195C15.0528 23.7402 13.0763 26.2815 16.7573 21.3997C20.8589 15.9599 21.7717 16.4714 28.5553 16.4714C32.9436 16.4714 32.2573 6.71852 31.2478 3.278C30.5396 0.864364 10.0311 2.61063 7.06426 2.61063C1.5172 2.61063 2.26672 3.32614 2.26672 8.87366C2.26672 10.6652 1.37433 15.8946 2.85418 16.8821C4.9318 18.2686 9.11673 17.3955 11.5191 17.3955C16.6593 17.3955 21.7996 17.3955 26.9398 17.3955"
        stroke={stroke ?? 'black'}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ChatIcon;
