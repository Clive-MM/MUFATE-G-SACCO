import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Define your SACCO theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#64dd17', // A700
    },
    secondary: {
      main: '#76ff03', // A400
    },
    background: {
      default: '#f8f6f2', // optional light background
    },
    text: {
      primary: '#000000',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
