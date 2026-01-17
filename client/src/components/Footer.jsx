import React, { useEffect, useState } from 'react';
import {
  Box, Typography, IconButton, Link
} from '@mui/material';
import {
  LocationOn, Email, AccessTime, Phone, ArrowUpward,
  Facebook, X
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa'; // ✅ WhatsApp Icon
import axios from 'axios';
import './Footer.css';
import SupportChatWidget from "./SupportChatWidget";

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
            src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png"
            alt="GOLDEN GENERATION DT Logo"
            className="footer-logo"
          />
          <Typography className="footer-title">WALKING WITH YOU</Typography>
          <Typography className="footer-description">
            Golden Generation DT Sacco, formerly Mufate G Sacco, has undergone rebranding to expand, modernize, and serve more members effectively. The rights, benefits, and privileges of our farmers remain fully protected and unchanged.
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

            <IconButton
              component="a"
              href="https://www.facebook.com/share/1CLhxfKxb2/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook />
            </IconButton>
            <IconButton
              component="a"
              href="https://wa.me/254791331932?text=Hello%20Mufate%20G%20Sacco%2C%20I%20would%20like%20to%20inquire%20about%20..."
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#25D366' }} 
            >
              <FaWhatsapp size={24} />
            </IconButton>
          </Box>
        </Box>

        {/* Column 2: Dynamic Recent Posts */}
        <Box className="footer-column">
          <Typography className="footer-heading">RECENT POSTS</Typography>
          <Box className="footer-images">
            {postImages.slice(0, 2).map((post) => (
              <Link key={post.PostID} component={RouterLink} to="/news" underline="none">
                <img src={post.CoverImage} alt={`Post ${post.PostID}`} />
              </Link>
            ))}
          </Box>
          <Box className="footer-images">
            {postImages.slice(2, 4).map((post) => (
              <Link key={post.PostID} component={RouterLink} to="/news" underline="none">
                <img src={post.CoverImage} alt={`Post ${post.PostID}`} />
              </Link>
            ))}
          </Box>
        </Box>

        {/* Column 3: Quick Links */}
        <Box className="footer-column">
          <Typography className="footer-heading">QUICK LINKS</Typography>
          <ul className="footer-links">
            <li><Link component={RouterLink} to="/" underline="none">Home</Link></li>
            <li><Link component={RouterLink} to="/about/who-we-are" underline="none">About us</Link></li>
            <li><Link component={RouterLink} to="/services" underline="none">Services</Link></li>
            <li><Link component={RouterLink} to="/products/bosa" underline="none">Our Products</Link></li>
            <li><Link component={RouterLink} to="/news" underline="none">Blogs & Posts</Link></li>
            <li><Link component={RouterLink} to="/faqs" underline="none">FAQs</Link></li>
            <li><Link component={RouterLink} to="/membership" underline="none">Membership</Link></li>
            <li><Link component={RouterLink} to="/contact" underline="none">Contact us</Link></li>
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
          GOLDEN GENERATION DEPOSIT TAKING SACCO © 2025. All Rights Reserved.
        </Typography>
      </Box>
      <SupportChatWidget />
    </Box>
  );
};

export default Footer;
