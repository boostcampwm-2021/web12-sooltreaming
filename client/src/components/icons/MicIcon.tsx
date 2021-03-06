import React from 'react';
import type { IconPropType } from '@ts-types/components/icons';

const MicIcon = ({ className, width, height, fill, stroke }: IconPropType): React.ReactElement => {
  return (
    <svg
      className={className ?? ''}
      width={width ?? 17}
      height={height ?? 32}
      viewBox="0 0 17 32"
      fill={fill ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.49296 3.20056C7.8332 6.20144 7.16017 10.4008 7.83264 13.5343C8.1533 15.0285 10.4344 14.1758 10.7009 13.0253C10.9973 11.7458 11.694 8.04701 10.9279 6.86573C10.717 6.54065 9.48681 3.74154 8.88503 4.85498C8.25038 6.02921 8.06098 10.312 8.53423 11.6254C9.21927 13.5266 11.082 6.23201 11.093 5.49129C11.1081 4.46203 11.1492 -0.171816 10.185 3.22601C9.66735 5.05041 9.88673 7.68659 9.97868 9.61462C10.0671 11.4693 10.7215 5.97472 10.7215 4.11685C10.7215 1.01022 9.09051 3.54448 8.86439 5.28767C8.7741 5.98375 7.76838 10.2484 9.60725 9.05466C10.9254 8.19895 10.9464 4.9244 10.5152 3.48054C8.81514 -2.21121 7.23154 11.02 8.12153 8.13837C8.47097 7.00695 8.49296 5.8691 8.49296 4.67681C8.49296 4.66408 8.18564 6.52904 8.14217 7.14571C8.06629 8.22204 8.12153 9.6132 8.12153 10.5309"
        stroke={stroke ?? 'black'}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M2 10.2997C2.9092 13.0044 4.12387 14.7889 5.26032 17.1719C5.68608 18.0647 8.37946 19.4626 9.24286 19.4626C11.6463 19.4626 12.2115 18.8125 13.6794 16.4847C14.6285 14.9795 15 12.1613 15 10.2997"
        stroke={stroke ?? 'black'}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M9.42853 19.9208C9.42853 22.3982 9.42853 24.8756 9.42853 27.3529C9.42853 29.2393 8.69853 28.8467 9.0571 28.6256"
        stroke={stroke ?? 'black'}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M6.45715 30C8.5129 29.517 10.3266 29.0837 12.4 29.0837"
        stroke={stroke ?? 'black'}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default MicIcon;
