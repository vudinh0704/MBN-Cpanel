import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  border: 0;
  box-sizing: inherit;
  -webkit-font-smoothing: auto;
  font-weight: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  text-decoration: none;
  text-rendering: optimizeLegibility;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

html {
  display: flex;
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 1.5;
  color: #16171a;
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: auto;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

body {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overscroll-behavior-y: none;
  -webkit-overflow-scrolling: touch;
}

/*Scrollbar*/
*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

*::-webkit-scrollbar-track {
  background: #f1f1f1;
}

*::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 8px;
}

*::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.mb-scroll {
  overflow-x: auto;
  /* firefox*/
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 white;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 20px;
    border: 3px solid #f1f1f1;
  }
}


a {
  color: inherit;
  text-decoration: none;
}

.main {
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer {
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer a {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

.logo {
  height: 1em;
  margin-left: 0.5rem;
}
`;
export default GlobalStyle;
