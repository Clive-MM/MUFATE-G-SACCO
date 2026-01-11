import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

// Page Imports
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AboutUs from './pages/AboutUs/AboutUs';
import BoardOfDirectors from './pages/AboutUs/BoardOfDirectors';
import ManagementTeam from './pages/AboutUs/ManagementTeam';
import FosaProducts from './pages/Products/FosaProducts';
import BosaProducts from './pages/Products/BosaProducts';
import Savings from './pages/Products/Savings';
import Services from './pages/Services/Services';
import Resources from './pages/Resources';
import Membership from './pages/Membership/Membership';
import ContactUs from './pages/ContactUs/ContactUs';
import Careers from './pages/Careers/Careers';
import MemberRegistration from "./pages/MemberRegistration";
import LoanCalculator from './pages/Products/LoanCalculator';

// Media & More Imports
import News from './more/News';
import Videos from './more/Videos';
import SaccoGallery from './more/saccogallery';
import FAQs from './more/FAQs';
import SupportChatWidget from "./components/SupportChatWidget";

function App({ mode }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: mode === 'light'
          ? 'linear-gradient(to bottom right, #f8f6f2, #e8fbe1)'
          : '#02150F', // Solid dark base to match brand
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* About Routes */}
          <Route path="/about/who-we-are" element={<AboutUs />} />
          <Route path="/about/board-of-directors" element={<BoardOfDirectors />} />
          <Route path="/about/management" element={<ManagementTeam />} />

          {/* Products & Services */}
          <Route path="/products/fosa" element={<FosaProducts />} />
          <Route path="/products/bosa" element={<BosaProducts />} />
          <Route path="/products/savings" element={<Savings />} />
          <Route path="/services" element={<Services />} />
          
          {/* Membership & Registration */}
          <Route path="/membership" element={<Membership />} />
          <Route path="/customer_registration" element={<MemberRegistration />} />
          <Route path="/products/loanCalculator" element={<LoanCalculator />} />

          {/* Media Nested Routes */}
          <Route path="/media/news" element={<News />} />
          <Route path="/media/insights" element={<Videos />} />
          <Route path="/media/gallery" element={<SaccoGallery />} />

          {/* Others */}
          <Route path="/resources" element={<Resources />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/mufategsaccosupport" element={<SupportChatWidget />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;