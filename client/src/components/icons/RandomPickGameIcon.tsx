import React from 'react';
import type { IconPropType } from '@ts-types/components/icons';

const RandomPickGameIcon = ({
  className,
  width,
  height,
  fill,
  stroke,
}: IconPropType): React.ReactElement => {
  return (
    <svg
      width={width ?? 30}
      height={height ?? 30}
      viewBox="0 0 250 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="250" height="250" fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_467_616" transform="scale(0.00195312)" />
        </pattern>
        <image
          id="image0_467_616"
          width="512"
          height="512"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default RandomPickGameIcon;