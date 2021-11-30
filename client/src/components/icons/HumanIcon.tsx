import React from 'react';
import type { IconPropType } from '@ts-types/components/icons';

const HumanIcon = ({
  className,
  width,
  height,
  fill,
  stroke,
}: IconPropType): React.ReactElement => {
  return (
    <svg
      className={className ?? ''}
      width={width ?? 21}
      height={height ?? 20}
      viewBox="0 0 21 20"
      fill={fill ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.74286 19.2195C1.74286 19.2195 1.17233 10.5258 10.4346 10.5258C19.6968 10.5258 19.1263 19.2175 19.1263 19.2175"
        stroke={stroke ?? '#D9DBC8'}
        strokeWidth="2"
      />
      <path
        d="M15.3728 5.87857C15.3728 8.46935 13.2725 10.5696 10.6818 10.5696C8.09099 10.5696 5.99075 8.46935 5.99075 5.87857C5.99075 3.2878 8.09099 1.18756 10.6818 1.18756C13.2725 1.18756 15.3728 3.2878 15.3728 5.87857Z"
        stroke={stroke ?? '#D9DBC8'}
      />
      <path
        d="M10.6818 10.5752C13.2756 10.5752 15.3784 8.47245 15.3784 5.87857C15.3784 3.2847 13.2756 1.18195 10.6818 1.18195C8.08789 1.18195 5.98514 3.2847 5.98514 5.87857C5.98514 8.47245 8.08789 10.5752 10.6818 10.5752Z"
        stroke={stroke ?? '#D9DBC8'}
        strokeWidth="2"
      />
    </svg>
  );
};

export default HumanIcon;
