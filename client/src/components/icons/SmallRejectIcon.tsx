import React from 'react';
import type { IconPropType } from '@ts-types/components/icons';

const SmallRejectIcon = ({
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
        fill={fill ?? '#FF8988'}
      />
      <path
        d="M23.1608 5.19V6.03H26.3008C26.1308 8.08 25.1108 9.67 22.7608 10.83L23.3108 11.63C26.3708 10.11 27.3508 7.84 27.3508 5.19H23.1608ZM29.2508 4.24V7.79H27.3108V8.64H29.2508V13.28H30.2908V4.24H29.2508ZM36.86 6.18V7.02H38.45V8.87H39.49V4.24H38.45V6.18H36.86ZM37.34 8.02C36.01 7.6 35.23 6.6 35.23 5.58V5.48H37.12V4.65H32.29V5.48H34.19V5.57C34.19 6.64 33.37 7.76 31.99 8.22L32.49 9.02C33.55 8.68 34.32 7.94 34.72 7.04C35.11 7.85 35.85 8.5 36.86 8.82L37.34 8.02ZM34.64 12.37V11.57H39.49V9.28H33.61V10.09H38.47V10.81H33.62V13.18H39.79V12.37H34.64Z"
        fill={fill ?? 'white'}
      />
    </svg>
  );
};

export default SmallRejectIcon;
