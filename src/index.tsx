import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from "styled-components";
import { colorTheme } from './theme';
import { GlobalStyle } from './GlobalStyle';
import { store } from './app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={colorTheme}>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </ThemeProvider>
);