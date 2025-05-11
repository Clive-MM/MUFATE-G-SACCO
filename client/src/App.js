import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './pages/Home'; // example route

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #f8f6f2, #e8fbe1)',
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes here */}
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
