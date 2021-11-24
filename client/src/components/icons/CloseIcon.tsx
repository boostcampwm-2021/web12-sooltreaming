import React from 'react';
import type { iconPropsType } from '@components/icons';

const CloseIcon = ({
  className,
  width,
  height,
  fill,
  stroke,
}: iconPropsType): React.ReactElement => {
  return (
    <svg
      width={width ?? 136}
      height={height ?? 36}
      viewBox="0 0 136 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 8C0 3.58172 3.58172 0 8 0H128C132.418 0 136 3.58172 136 8V28C136 32.4183 132.418 36 128 36H8C3.58172 36 0 32.4183 0 28V8Z"
        fill={fill ?? '#FF8988'}
      />
      <path
        d="M63.0731 17.322C61.5471 17.63 60.1891 17.714 57.7951 17.728V14.396H61.9531V13.22H56.3531V18.904H57.3751C60.0911 18.904 61.5751 18.82 63.2131 18.47L63.0731 17.322ZM59.1111 21.354H65.8031V20.206H57.6691V24.924H66.0271V23.762H59.1111V21.354ZM65.7051 15.32V12.422H64.2631V19.534H65.7051V16.51H67.4971V15.32H65.7051ZM69.428 13.766V14.942H73.936C73.684 17.854 72.116 20.08 68.798 21.676L69.568 22.824C73.908 20.724 75.42 17.532 75.42 13.766H69.428ZM77.702 12.436V25.078H79.144V12.436H77.702Z"
        fill={fill ?? 'white'}
      />
    </svg>
  );
};

export default CloseIcon;
