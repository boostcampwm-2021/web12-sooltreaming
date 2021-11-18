import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  // Noto Sans Korean (한국어만)
  @font-face {
    src: 'Noto Sans KR';
    font-family: 'Noto Sans KR';
    unicode-range: U+AC00-U+D7A3;
  }
  body {
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
    font-family: 'Merriweather', 'Noto Sans KR', sans-serif;
  }
  #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
