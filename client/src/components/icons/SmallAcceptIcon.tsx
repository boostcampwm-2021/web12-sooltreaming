import React from 'react';
import type { IconPropType } from '@ts-types/components/icons';

const SmallAcceptIcon = ({
  className,
  width,
  height,
  fill,
  stroke,
}: IconPropType): React.ReactElement => {
  return (
    <svg
      width={width ?? 63}
      height={height ?? 17}
      viewBox="0 0 63 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 8C0 3.58172 3.58172 0 8 0H55C59.4183 0 63 3.58172 63 8V9C63 13.4183 59.4183 17 55 17H8C3.58172 17 0 13.4183 0 9V8Z"
        fill={fill ?? '#BED297'}
      />
      <path
        d="M30.6208 7.57C28.8008 7.31 27.4408 6.18 27.4408 5.01V4.53H26.3508V5.01C26.3508 6.2 25.0108 7.31 23.1708 7.57L23.5708 8.4C25.0708 8.16 26.3208 7.41 26.9008 6.36C27.4908 7.4 28.7208 8.16 30.2208 8.4L30.6208 7.57ZM30.9708 9.25H22.8108V10.09H26.3508V13.28H27.3808V10.09H30.9708V9.25ZM37.26 8.19C36.02 8.42 34.93 8.47 33.38 8.48V7.38H36.45V4.75H32.35V5.58H35.43V6.6H32.37V9.32H33.1C34.83 9.32 36.01 9.27 37.37 9.03L37.26 8.19ZM33.12 11.01H38.03V13.28H39.06V10.18H33.12V11.01ZM40.34 6.49H39.06V4.24H38.03V9.73H39.06V7.34H40.34V6.49Z"
        fill={fill ?? 'white'}
      />
    </svg>
  );
};

export default SmallAcceptIcon;
