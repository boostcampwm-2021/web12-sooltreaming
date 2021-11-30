import React from 'react';
import type { IconPropType } from '@ts-types/components/icons';

const VideoIcon = ({
  className,
  width,
  height,
  fill,
  stroke,
}: IconPropType): React.ReactElement => {
  return (
    <svg
      className={className ?? ''}
      width={width ?? 42}
      height={height ?? 23}
      viewBox="0 0 42 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5982 6.34287C12.0368 5.22256 8.43293 2.19123 6.38386 2.07231C3.31414 1.89416 4.34569 4.05205 2.93702 5.78928C2.21283 6.68239 1.51263 18.8491 2.45607 19.115C3.60894 19.44 8.11367 19.4093 8.50808 18.0474C8.78159 17.1029 12.1864 13.7458 12.8367 15.9912C14.3716 21.2914 18.7336 20.5781 23.6982 20.5781C26.9341 20.5781 34.9569 21.9657 37.2451 19.7081C38.8092 18.165 41.8599 8.76782 38.4475 7.80593C37.4717 7.53085 33.7623 5.40883 33.0769 4.56347C31.9353 3.1557 27.9302 3.21438 26.2633 2.74453C21.9977 1.54211 16.4894 1.34974 14.3196 5.63111"
        stroke={stroke ?? 'black'}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default VideoIcon;
