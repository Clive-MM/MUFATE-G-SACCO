import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  TextField
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SavingsIcon from '@mui/icons-material/Savings';

import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../../components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SavingsProducts = () => {
  const [savings, setSavings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(null);

  // Standardized Brand Colors
  const COLORS = {
    gold: '#EC9B14',      // Matches the logo/footer gold
    dark: '#02150F',      // Matches the deep dark background
    textLight: '#F4F4F4',
    cardBg: 'rgba(255,255,255,0.98)'
  };

  useEffect(() => {
    axios
      .get('https://mufate-g-sacco.onrender.com/products')
      .then(res => setSavings(res.data.products))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const filteredSavings = Array.from(
    new Map(
      savings
        .filter(item =>
          item.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(item => [item.ProductID, item])
    ).values()
  );

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 700,
    slidesToShow: Math.min(filteredSavings.length, 2),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: true,
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
  };

  return (
    <Box
      sx={{
        background: COLORS.dark,
        // Increased padding to push title below the navigation bar
        pt: { xs: 14, md: 18 }, 
        pb: { xs: 6, md: 8 },
      }}
    >
      {/* SECTION TITLE */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 900,
          textTransform: 'uppercase',
          mb: 5,
          letterSpacing: '3px',
          color: COLORS.gold,
          fontSize: { xs: '1.6rem', md: '2.3rem' },
          textShadow: `0 0 15px ${COLORS.gold}33`,
        }}
      >
        Savings Products
      </Typography>

      {/* SEARCH BAR */}
      <Box sx={{ maxWidth: 420, mx: 'auto', mb: 6, px: 2 }}>
        <TextField
          fullWidth
          placeholder="Search savings product..."
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: `0 0 20px ${COLORS.gold}20`,
            '& .MuiOutlinedInput-root': {
              fontWeight: 600,
              '& fieldset': { border: 'none' },
            },
          }}
        />
      </Box>

      {/* CONTENT */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
        {searchTerm ? (
          filteredSavings.map((item, index) => (
            <Box key={item.ProductID} px={2} mb={4}>
              <SavingsCard
                item={item}
                index={index}
                expanded={expanded}
                handleExpandClick={handleExpandClick}
                COLORS={COLORS}
              />
            </Box>
          ))
        ) : (
          <Slider {...sliderSettings}>
            {filteredSavings.map((item, index) => (
              <Box key={item.ProductID} px={2}>
                <SavingsCard
                  item={item}
                  index={index}
                  expanded={expanded}
                  handleExpandClick={handleExpandClick}
                  COLORS={COLORS}
                />
              </Box>
            ))}
          </Slider>
        )}
      </Box>

      {/* GOLD DIVIDER */}
      <Box
        sx={{
          height: '4px',
          background: COLORS.gold,
          mt: 10,
          opacity: 0.4
        }}
      />

      <Footer />
    </Box>
  );
};

/* ======================
    SHARED SAVINGS CARD
====================== */
const SavingsCard = ({ item, index, expanded, handleExpandClick, COLORS }) => (
  <Card
    data-aos="zoom-in"
    sx={{
      borderRadius: '24px',
      background: COLORS.cardBg,
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: `0 0 30px ${COLORS.gold}40`,
        border: `1px solid ${COLORS.gold}80`,
      },
      maxWidth: 500,
      mx: 'auto',
      mb: 3
    }}
  >
    {/* HEADER */}
    <CardHeader
      avatar={
        <Avatar
          sx={{
            background: COLORS.dark,
            border: `1px solid ${COLORS.gold}`,
          }}
        >
          <SavingsIcon sx={{ color: COLORS.gold }} />
        </Avatar>
      }
      title={
        <Typography sx={{ fontWeight: 800, color: COLORS.dark, textTransform: 'uppercase', fontSize: '1.1rem' }}>
          {item.ProductName}
        </Typography>
      }
    />

    {/* IMAGE */}
    {item.ImageURL && (
      <CardMedia
        component="img"
        height="300"
        image={item.ImageURL}
        alt={item.ProductName}
        sx={{ 
            objectFit: 'cover',
            filter: 'brightness(0.95)',
            borderBottom: `2px solid ${COLORS.gold}20`
        }}
      />
    )}

    {/* INTRO */}
    <CardContent>
      <Typography sx={{ color: '#2C3E50', lineHeight: 1.7, fontWeight: 500 }}>
        {item.Intro}
      </Typography>
    </CardContent>

    {/* EXPAND BUTTON */}
    <CardActions disableSpacing>
      <IconButton
        onClick={() => handleExpandClick(index)}
        sx={{
          ml: 'auto',
          color: COLORS.dark,
          transform: expanded === index ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: '0.3s ease',
          '&:hover': { color: COLORS.gold },
        }}
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>

    {/* EXPANDED CONTENT */}
    <Collapse in={expanded === index} timeout="auto" unmountOnExit>
      <CardContent sx={{ pt: 0, borderTop: '1px dashed rgba(0,0,0,0.1)' }}>
        {item.Features && (
          <Box mt={2} mb={3}>
            <Typography sx={{ fontWeight: 900, color: COLORS.gold, textTransform: 'uppercase', fontSize: '0.85rem', mb: 1 }}>
              Key Features
            </Typography>
            <Typography sx={{ color: '#444', fontSize: '0.95rem', borderLeft: `3px solid ${COLORS.gold}`, pl: 2 }}>
              {item.Features}
            </Typography>
          </Box>
        )}

        {item.Benefits && (
          <Box mb={2}>
            <Typography sx={{ fontWeight: 900, color: COLORS.gold, textTransform: 'uppercase', fontSize: '0.85rem', mb: 1 }}>
              Member Benefits
            </Typography>
            <Typography sx={{ color: '#444', fontSize: '0.95rem', borderLeft: `3px solid ${COLORS.dark}`, pl: 2 }}>
              {item.Benefits}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Collapse>
  </Card>
);

export default SavingsProducts;