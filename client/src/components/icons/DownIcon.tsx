import React from 'react';
import type { iconPropsType } from '@components/icons';

const DownIcon = ({ width, height, fill, stroke }: iconPropsType): React.ReactElement => {
  return (
    <svg  
      width={width ?? 18}
      height={height ?? 10}
      viewBox="0 0 18 10"
      fill={fill ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M17 0.999999L9 9L1 1" 
        stroke={ stroke ?? "white"} 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </svg>

  );
};

export default DownIcon;
