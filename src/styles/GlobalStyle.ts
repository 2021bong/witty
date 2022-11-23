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
  b,
  h1, h2, h3, h4, h5 {
    font-weight: 700;
  }
  input,
  textarea {
    outline: none;
    border: 1px solid #ddd;
  }
  textarea {
    resize: none;
  }

  body{
    -ms-overflow-style: none;
  }
  
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyle;
