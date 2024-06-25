import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }

  body {
    background: url('/path/to/your/background-image.jpg') no-repeat center center fixed;
    background-size: cover;
    color: #333;
    font-size: 16px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .App {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
  }
`;

export default GlobalStyle;
