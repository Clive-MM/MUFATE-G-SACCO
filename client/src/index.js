import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const Root = () => {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: {
          main: '#64dd17',
        },
        secondary: {
          main: '#76ff03',
        },
        background: {
          default: mode === 'light' ? '#f8f6f2' : '#121212',
          paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
        },
        text: {
          primary: mode === 'light' ? '#000' : '#fff',
        },
      },
      typography: {
        fontFamily: 'Roboto, sans-serif',
      },
    }), [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App toggleTheme={() => setMode(prev => (prev === 'light' ? 'dark' : 'light'))} mode={mode} />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
