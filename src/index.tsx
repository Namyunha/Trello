import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from "styled-components";
import { colorTheme } from './theme';
import { GlobalStyle } from './GlobalStyle';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={colorTheme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
);