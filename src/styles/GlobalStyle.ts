import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', 'Noto Sans', sans-serif;
  }
  ul, ol, li {
    list-style: none;
  }
  a{
    text-decoration: none;
    color: #000;
  }
  button {
    cursor: pointer;
  }
  b {
    font-weight: 700;
  }
  input,
  textarea {
    outline: none;
  }
  textarea {
    resize: none;
  }
`;

export default GlobalStyle;
