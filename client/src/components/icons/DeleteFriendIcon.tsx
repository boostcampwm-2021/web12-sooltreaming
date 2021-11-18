import React from 'react';
import type { iconPropsType } from '@components/icons';

const DeleteFriendIcon = ({
  className,
  width,
  height,
  fill,
  stroke,
}: iconPropsType): React.ReactElement => {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 8.00001C0 3.58173 3.58172 0 8 0H39.8774C44.2956 0 47.8774 3.58172 47.8774 8V39.8774C47.8774 44.2956 44.2956 47.8774 39.8774 47.8774H8.00001C3.58173 47.8774 0 44.2956 0 39.8774V8.00001Z"
        fill="#FF8988"
      />
      <path d="M14.5 24.5H35.5" stroke="white" stroke-width="3" stroke-linecap="round" />
    </svg>
  );
};

export default DeleteFriendIcon;