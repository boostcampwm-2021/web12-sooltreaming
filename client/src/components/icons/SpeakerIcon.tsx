import React from 'react';
import type { IconPropType } from '@ts-types/components/icons';

const SpeakerIcon = ({
  className,
  width,
  height,
  fill,
  stroke,
}: IconPropType): React.ReactElement => {
  return (
    <svg
      className={className ?? ''}
      width={width ?? 35}
      height={height ?? 26}
      viewBox="0 0 35 26"
      fill={fill ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8.68249C4.76565 8.68249 7.53131 8.68249 10.297 8.68249C11.6738 8.68249 12.213 7.91793 13.0324 6.68933C13.9676 5.28714 15.0626 4.06195 15.8736 2.57646C16.0039 2.33771 16.9424 1.67144 16.9617 2.19681C17.0444 4.44643 16.9617 6.71622 16.9617 8.96723C16.9617 13.4703 16.9617 17.9734 16.9617 22.4764C16.9617 22.9428 17.2152 24.4209 16.4177 23.8843C15.1412 23.0254 14.2713 21.1296 13.4253 19.8505C12.0752 17.8093 10.7449 18.0788 8.52876 18.0788C7.31853 18.0788 4.01481 18.7421 3.69264 17.2246C3.26589 15.2145 3.63219 12.7506 3.63219 10.6915C3.63219 10.3319 3.36016 7.50287 3.36016 8.68249"
        stroke={stroke ?? 'black'}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M20 11C22.5231 12.1898 22.685 13.3342 22.9665 15.4274C22.9994 15.6718 23.1088 17.5673 22.6139 16.8313"
        stroke={stroke ?? 'black'}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M24 7C26.9559 7.69755 27 11.5892 27 14.3298C27 15.5237 26.9364 16.4579 26.4545 17.5549C26.3215 17.8578 25.9091 19.6786 25.9091 18.7277"
        stroke={stroke ?? 'black'}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M30.8412 4C32.6722 7.31558 33.386 11.4368 32.7994 15.2308C32.4974 17.1834 31.5484 18.6239 30.4613 20.1846C30.0089 20.8341 29.2382 21.2478 29 22"
        stroke={stroke ?? 'black'}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SpeakerIcon;
