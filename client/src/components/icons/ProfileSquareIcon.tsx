import React from 'react';
import type { IconPropType } from '@ts-types/components/icons';

const ProfileSquareIcon = ({
  className,
  width,
  height,
  fill,
  stroke,
}: IconPropType): React.ReactElement => {
  return (
    <svg
      width={width ?? 150}
      height={height ?? 150}
      viewBox="0 0 73 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="1.1626"
        width="71.5455"
        height="71.3373"
        rx="7.5"
        fill="white"
        stroke={stroke ?? '#D9DBC8'}
      />
      <path
        d="M42.9546 28.2651H29.591C28.5366 28.2651 27.6819 29.1174 27.6819 30.1688V43.4941C27.6819 44.5454 28.5366 45.3977 29.591 45.3977H42.9546C44.009 45.3977 44.8637 44.5454 44.8637 43.4941V30.1688C44.8637 29.1174 44.009 28.2651 42.9546 28.2651Z"
        stroke={stroke ?? '#D9DBC8'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.9318 34.9277C33.7226 34.9277 34.3636 34.2885 34.3636 33.5C34.3636 32.7115 33.7226 32.0723 32.9318 32.0723C32.141 32.0723 31.5 32.7115 31.5 33.5C31.5 34.2885 32.141 34.9277 32.9318 34.9277Z"
        stroke={stroke ?? '#D9DBC8'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M44.8637 39.6868L40.0909 34.9277L29.5909 45.3976"
        stroke={stroke ?? '#D9DBC8'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ProfileSquareIcon;
