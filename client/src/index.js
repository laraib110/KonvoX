import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk'; // ✅ Corrected
import { createTheme, ThemeProvider } from '@mui/material/styles'; // ✅ New
import { reducers } from './reducers';

import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

// ✅ Create a basic MUI theme
const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}> {/* ✅ Added wrapper */}
      <App />
    </ThemeProvider>
  </Provider>
);
