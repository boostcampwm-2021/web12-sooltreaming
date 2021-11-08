import React from 'react';
import type { iconPropsType } from '@components/icons';

const D = {
  ON: "M13.652 5.417H3.764c-.905 0-1.639.734-1.639 1.639v9.888c0 .905.734 1.639 1.64 1.639h9.887c.905 0 1.64-.734 1.64-1.639V7.056c0-.905-.735-1.639-1.64-1.639zm6.494 1.293l-3.758 2.592v5.396l3.758 2.589c.727.5 1.728-.01 1.728-.885V7.594c0-.87-.998-1.385-1.728-.884z" ,
  OFF: "M22.76 18.93l-1.887-1.458c.528-.048 1.002-.47 1.002-1.066V7.594c0-.874-.998-1.385-1.729-.884L16.39 9.302v4.704l-1.097-.847V7.056c0-.905-.734-1.639-1.64-1.639H5.278L2.589 3.34a.55.55 0 00-.772.096l-.672.864a.546.546 0 00.096.768l1.252.967 12.799 9.895 6.12 4.732a.55.55 0 00.771-.096l.672-.868a.544.544 0 00-.096-.768zM2.125 16.943c0 .905.734 1.639 1.639 1.639h9.888c.384 0 .733-.137 1.015-.36L2.126 8.527v8.417z"
}


const VideoIcon = ({ width, height, fill, state }: iconPropsType): React.ReactElement => {
  return (
    <svg 
      width={width ?? 24}
      height={height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={state ? D.ON : D.OFF}
        fill={fill ?? 'black'}
      />
    </svg>
  );
};

export default VideoIcon;
