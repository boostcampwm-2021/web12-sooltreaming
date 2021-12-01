import React from 'react';
import type { IconPropType } from '@ts-types/components/icons';

const ChangeNicknameIcon = ({
  className,
  width,
  height,
  fill,
  stroke,
}: IconPropType): React.ReactElement => {
  return (
    <svg
      width={width ?? 49}
      height={height ?? 49}
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.877441 8.20753C0.877441 3.78925 4.45916 0.20752 8.87744 0.20752H40.7548C45.1731 0.20752 48.7548 3.78924 48.7548 8.20752V40.0849C48.7548 44.5031 45.1731 48.0849 40.7548 48.0849H8.87745C4.45917 48.0849 0.877441 44.5032 0.877441 40.0849V8.20753Z"
        fill={fill ?? '#BED297'}
      />
      <path
        d="M35.5706 17.8929L35.325 18.1384L30.852 13.6625L31.0966 13.4179C31.4089 13.0154 31.801 12.6817 32.2482 12.4378C32.6954 12.1938 33.1882 12.0448 33.6956 12C34.1198 12.0188 34.5358 12.1234 34.9183 12.3076C35.3009 12.4917 35.6422 12.7516 35.9214 13.0714C38.5383 15.692 35.5706 17.8929 35.5706 17.8929ZM33.8581 19.6071L18.6248 34.8473L12 37L14.1535 30.3705L29.3851 15.1304L29.5824 15.3277L33.8581 19.6071ZM14.1562 34.8437L17.4659 33.8911L15.2052 31.4804L14.1562 34.8437Z"
        fill={fill ?? '#F7F7F7'}
      />
    </svg>
  );
};

export default ChangeNicknameIcon;
