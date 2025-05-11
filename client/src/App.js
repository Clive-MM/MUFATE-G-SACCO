import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App({ toggleTheme, mode }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: mode === 'light'
          ? 'linear-gradient(to bottom right, #f8f6f2, #e8fbe1)'
          : 'linear-gradient(to bottom right, #121212, #1e1e1e)',
      }}
    >
      <BrowserRouter>
        <Navbar toggleTheme={toggleTheme} mode={mode} />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
