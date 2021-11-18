import React from 'react';
import type { iconPropsType } from '@components/icons';

const ExitIcon = ({
  className,
  width,
  height,
  fill,
  stroke,
}: iconPropsType): React.ReactElement => {
  return (
    <svg
      width={width ?? 28}
      height={height ?? 51}
      viewBox="0 0 31 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.23413 11.1715C2.77016 14.4193 2.57575 17.7465 2.28263 21.0159C1.964 24.5698 2.20199 28.1261 2.04475 31.6837C1.88439 35.3119 2.19935 38.644 2.70348 42.2233C2.79389 42.8652 2.96475 43.2832 3.23413 43.8519C3.542 44.5018 3.48604 45.2149 3.69158 45.883C3.86817 46.4569 3.81188 47.4701 3.65498 48.0238C3.27347 49.3703 3.06945 47.1154 3.06945 46.743"
        stroke={stroke ?? 'black'}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M3.72821 10.5128C11.85 10.5128 19.9737 10.6775 28.0921 10.6775C28.6816 10.6775 29.1128 10.5228 29.2174 11.2447C29.718 14.6987 29.3964 18.3332 28.9247 21.7661C27.9614 28.7763 27.1131 35.8448 27.1131 42.937C27.1131 43.8641 27.1131 44.7912 27.1131 45.7183C27.1131 46.5249 26.8321 47.5209 26.61 48.2983C26.532 48.571 25.5451 48.5545 25.3565 48.5545C22.5203 48.5545 19.6841 48.5545 16.8479 48.5545C13.6031 48.5545 10.3582 48.5545 7.11335 48.5545C6.45263 48.5545 6.26397 48.1831 5.7044 47.8958C5.27071 47.6731 4.55154 47.5662 4.38694 47.0724"
        stroke={stroke ?? 'black'}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M22.1727 27.1458C21.7151 27.2315 21.1846 27.1872 21.1846 27.7221C21.1846 27.9813 21.17 28.1216 21.4773 28.1338C21.9447 28.1525 22.2793 27.4751 21.6786 27.4751"
        stroke={stroke ?? 'black'}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M3.89288 8.86595C6.26971 8.45458 8.42114 7.27606 10.6449 6.38656C11.3839 6.09094 12.0837 5.69998 12.8223 5.40762C13.5341 5.12589 14.2801 5.10723 14.9632 4.74888C16.8433 3.76259 18.9193 3.05716 20.8552 2.24205C21.0199 2.17271 21.8916 1.66558 21.9988 2.04077C22.1978 2.73723 22.1637 3.9104 22.1727 4.6208C22.1954 6.4195 22.1727 8.21979 22.1727 10.0187"
        stroke={stroke ?? 'black'}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ExitIcon;
