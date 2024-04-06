import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from "styled-components";
import { colorTheme } from './theme';
import { GlobalStyle } from './GlobalStyle';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={colorTheme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>
);