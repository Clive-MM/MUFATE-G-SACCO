import React, { useEffect, useState } from 'react';
import {
  Box, Typography, IconButton, Link
} from '@mui/material';
import {
  LocationOn, Email, AccessTime, Phone, ArrowUpward,
  Facebook, Instagram, X
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import './Footer.css';

const Footer = () => {
  const [postImages, setPostImages] = useState([]);

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/posts/images')
      .then((res) => setPostImages(res.data.images))
      .catch((err) => console.error('❌ Failed to fetch recent post images:', err));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box className="footer-container">
      <Box className="footer-content">
        {/* Column 1: Logo + Description + Socials */}
        <Box className="footer-column">
          <img
            src="https://res.cloudinary.com/djydkcx01/image/upload/v1746061572/Mufate_Logo_jnnh7x.png"
            alt="Mufate Logo"
            className="footer-logo"
          />
          <Typography className="footer-title">INVEST HERE REAP HERE</Typography>
          <Typography className="footer-description">
            Mufate ‘G’ Sacco society limited is a Sacco that started in 1987 and provides financial
            services to farmers, business community and other institutions.
          </Typography>
          <Box className="footer-icons">
            <IconButton
              component="a"
              href="https://x.com/GMufate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <X />
            </IconButton>
            <IconButton><Instagram /></IconButton>
            <IconButton>
              component="a"
              href="https://www.facebook.com/share/1CLhxfKxb2/"
              target="_blank"
              rel="noopener noreferrer"
              <Facebook />         
            
            </IconButton>
          </Box>
        </Box>

        {/* ✅ Column 2: Dynamic Recent Posts */}
        <Box className="footer-column">
          <Typography className="footer-heading">RECENT POSTS</Typography>
          <Box className="footer-images">
            {postImages.slice(0, 2).map((post) => (
              <Link key={post.PostID} component={RouterLink} to="/news">
                <img src={post.CoverImage} alt={`Post ${post.PostID}`} />
              </Link>
            ))}
          </Box>
          <Box className="footer-images">
            {postImages.slice(2, 4).map((post) => (
              <Link key={post.PostID} component={RouterLink} to="/news">
                <img src={post.CoverImage} alt={`Post ${post.PostID}`} />
              </Link>
            ))}
          </Box>
        </Box>

        {/* Column 3: Quick Links */}
        <Box className="footer-column">
          <Typography className="footer-heading">QUICK LINKS</Typography>
          <ul className="footer-links">
            <li><Link component={RouterLink} to="/">Home</Link></li>
            <li><Link component={RouterLink} to="/about/who-we-are">About us</Link></li>
            <li><Link component={RouterLink} to="/services">Services</Link></li>
            <li><Link component={RouterLink} to="/products/bosa">Our Products</Link></li>
            <li><Link component={RouterLink} to="/news">Blogs & Posts</Link></li>
            <li><Link component={RouterLink} to="/faqs">FAQs</Link></li>
            <li><Link component={RouterLink} to="/membership">Membership</Link></li>
            <li><Link component={RouterLink} to="/contact">Contact us</Link></li>
          </ul>
        </Box>

        {/* Column 4: Contact Info */}
        <Box className="footer-column">
          <Typography className="footer-heading">CONTACT US</Typography>
          <Box className="contact-info">
            <Box className="contact-item">
              <Box className="icon-wrapper"><Phone /></Box>
              <span>+254791331932 / +254794515407</span>
            </Box>
            <Box className="contact-item">
              <Box className="icon-wrapper"><LocationOn /></Box>
              <span>Khayega - Kakamega</span>
            </Box>
            <Box className="contact-item">
              <Box className="icon-wrapper"><Email /></Box>
              <span>Info@mudetesacco.co.ke</span>
            </Box>
            <Box className="contact-item">
              <Box className="icon-wrapper"><AccessTime /></Box>
              <span>Monday - Friday 8:30AM - 4.00PM</span>
            </Box>
            <Box className="contact-item">
              <Box className="icon-wrapper"><AccessTime /></Box>
              <span>Saturday 8:30AM - 12.30PM</span>
            </Box>
          </Box>
        </Box>
      </Box>

      <IconButton className="scroll-to-top" onClick={scrollToTop}>
        <ArrowUpward />
      </IconButton>

      <Box className="footer-bottom">
        <Typography variant="body2">
          Mufate Sacco Society Limited © 2025. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
