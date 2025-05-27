import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import BoardOfDirectors from './pages/AboutUs/BoardOfDirectors';
import ManagementTeam from './pages/AboutUs/ManagementTeam';
import AboutUs from './pages/AboutUs/AboutUs';
import FosaProducts from './pages/Products/FosaProducts';
import BosaProducts from './pages/Products/BosaProducts';
import Savings from './pages/Products/Savings';
import Services from './pages/Services/Services';
import Resources from './pages/Resources';
import Membership from './pages/Membership';

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
        <Navbar  />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* ✅ NEW ROUTE ) */}
          <Route path="/about/who-we-are" element={<AboutUs />} />
          <Route path="/about/board-of-directors" element={<BoardOfDirectors />} />
           <Route path="/about/management" element={<ManagementTeam />} />
           <Route path="/products/fosa" element={<FosaProducts />} />
           <Route path="/products/bosa" element={<BosaProducts />} />
           <Route path="/products/savings" element={<Savings />} />
           <Route path="/services" element={<Services />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/membership" element={<Membership />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
