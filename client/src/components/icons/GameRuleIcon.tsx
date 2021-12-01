import React from 'react';
import type { IconPropType } from '@ts-types/components/icons';

const GameRuleIcon = ({
  className,
  width,
  height,
  fill,
  stroke,
}: IconPropType): React.ReactElement => {
  return (
    <svg
      className={className ?? ''}
      width={width ?? 23}
      height={height ?? 23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="11.4545" cy="11.0634" rx="11.4545" ry="11.0634" fill="#176842" />
      <path
        d="M10.492 13.906H11.626C11.374 11.708 13.894 10.882 13.894 8.824C13.894 7.298 12.858 6.332 11.276 6.332C10.142 6.332 9.246 6.878 8.602 7.62L9.33 8.292C9.82 7.732 10.436 7.396 11.136 7.396C12.13 7.396 12.648 8.068 12.648 8.908C12.648 10.574 10.17 11.47 10.492 13.906ZM11.094 17.182C11.612 17.182 12.032 16.79 12.032 16.216C12.032 15.628 11.612 15.222 11.094 15.222C10.59 15.222 10.17 15.628 10.17 16.216C10.17 16.79 10.59 17.182 11.094 17.182Z"
        fill={fill ?? '#F7F7F7'}
      />
    </svg>
  );
};

export default GameRuleIcon;
