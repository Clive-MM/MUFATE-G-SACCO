import React from 'react';
import { Box, Typography, IconButton, Link } from '@mui/material';
import {
  LocationOn, Email, AccessTime, Phone, ArrowUpward,
  Facebook, Instagram, X
} from '@mui/icons-material';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box className="footer-container">
      <Box className="footer-content">
       
        <Box className="footer-column">
          <img src="https://res.cloudinary.com/djydkcx01/image/upload/v1746061572/Mufate_Logo_jnnh7x.png" alt="Mufate Logo" className="footer-logo" />
          <Typography className="footer-title">INVEST HERE REAP HERE</Typography>
          <Typography className="footer-description">
            Mufate ‘G’ Sacco society limited is a Sacco that started in 1987 and provides financial
            services to farmers, business community and other institutions.
          </Typography>
          <Box className="footer-icons">
            <IconButton><X /></IconButton>
            <IconButton><Instagram /></IconButton>
            <IconButton><Facebook /></IconButton>
          </Box>
        </Box>

       
        <Box className="footer-column">
          <Typography className="footer-heading">RECENT POSTS</Typography>
          <Box className="footer-images">
            <img src="https://res.cloudinary.com/djydkcx01/image/upload/v1746217592/CROP_ADVANCE_LOAN_IMAGE_rxkpxb.png" alt="Post 1" />
            <img src="https://res.cloudinary.com/djydkcx01/image/upload/v1746220668/school_fees_Loan_image_sslrcp.png" alt="Products Review" />
          </Box>
          <Box className="footer-images">
            <img src="https://res.cloudinary.com/djydkcx01/image/upload/v1746215520/Schools_Sacco_Client_njawjp.jpg" alt="Post 3" />
            <img src="https://res.cloudinary.com/djydkcx01/image/upload/v1746215778/sacco_Clients_dqus7m.jpg" alt="Post 4" />
          </Box>
        </Box>

       
        <Box className="footer-column">
          <Typography className="footer-heading">QUICK LINKS</Typography>
          <ul className="footer-links">
            <li><Link href="#">Home</Link></li>
            <li><Link href="#">About us</Link></li>
            <li><Link href="#">Services</Link></li>
            <li><Link href="#">Our Products</Link></li>
            <li><Link href="#">Blogs & Posts</Link></li>
            <li><Link href="#">FAQs</Link></li>
            <li><Link href="#">Membership</Link></li>
            <li><Link href="#">Contact us</Link></li>
          </ul>
        </Box>

        {/* Contact Info */}
        <Box className="footer-column">
          <Typography className="footer-heading">CONTACT US</Typography>
          <Box className="footer-contact">
            <Phone /><span>+254791331932 / +254794515407</span>
          </Box>
          <Box className="footer-contact">
            <LocationOn /><span>Khayega - Kakamega</span>
          </Box>
          <Box className="footer-contact">
            <Email /><span>Info@mudetesacco.co.ke</span>
          </Box>
          <Box className="footer-contact">
            <AccessTime /><span>Monday - Friday 8:30 - 5.30PM</span>
          </Box>
        </Box>
      </Box>

      {/* Scroll-to-top button */}
      <IconButton className="scroll-to-top" onClick={scrollToTop}>
        <ArrowUpward />
      </IconButton>

      <Box className="footer-bottom">
        <Typography variant="body2">
          Mufate Sacco Society Limited © 2024. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
