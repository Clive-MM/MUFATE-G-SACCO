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
import Membership from './pages/Membership/Membership';
import FAQs from './more/FAQs';
import ContactUs from './pages/ContactUs/ContactUs';
import Careers from './pages/Careers/Careers';
import News from './more/News';
import MemberRegistration from "./pages/MemberRegistration";
import LoanCalculator from './pages/Products/LoanCalculator';
import SupportChatWidget from "./components/SupportChatWidget";
import Gallery from './components/Gallery';
import Blogs from './components/Blogs';
import Videos from './components/Videos';
import SaccoGallery from './more/saccogallery';

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
        <Navbar />
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
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/media/gallery" element={<SaccoGallery />} />
          <Route path="/media/videos" element={<Videos />} />
          <Route path="/media/blogs" element={<News />} />
          <Route path="/news" element={<News />} />
          <Route path="/customer_registration" element={<MemberRegistration />} />
          <Route path="/products/loanCalculator" element={<LoanCalculator />} />
          <Route path="/mufategsaccosupport" element={<SupportChatWidget />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
