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

  useEffect(() => {
    axios
      .get('https://mufate-g-sacco.onrender.com/products')
      .then(res => setSavings(res.data.products))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const uniqueFilteredSavings = Array.from(
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
    slidesToShow: Math.min(uniqueFilteredSavings.length, 2),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #0B3D2E, #124E3B)',
        py: 7
      }}
    >
      {/* Title */}
      <Typography
        variant="h5"
        align="center"
        sx={{
          color: '#C9A227',
          fontWeight: 800,
          textTransform: 'uppercase',
          mb: 4,
          letterSpacing: '1.5px',
          textShadow: '0 0 8px rgba(201,162,39,0.6)'
        }}
      >
        Golden Generation Savings Products
      </Typography>

      {/* Search */}
      <Box sx={{ maxWidth: 420, mx: 'auto', mb: 5 }}>
        <TextField
          fullWidth
          placeholder="Search savings product..."
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: '#fff',
            borderRadius: 3,
            '& fieldset': {
              borderColor: '#C9A227'
            }
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
        {searchTerm ? (
          uniqueFilteredSavings.map((item, index) => (
            <Box key={item.ProductID} px={2} mb={4}>
              <SavingsCard
                item={item}
                index={index}
                expanded={expanded}
                handleExpandClick={handleExpandClick}
              />
            </Box>
          ))
        ) : (
          <Slider {...sliderSettings}>
            {uniqueFilteredSavings.map((item, index) => (
              <Box key={item.ProductID} px={2}>
                <SavingsCard
                  item={item}
                  index={index}
                  expanded={expanded}
                  handleExpandClick={handleExpandClick}
                />
              </Box>
            ))}
          </Slider>
        )}
      </Box>

      {/* Gold Divider */}
      <Box sx={{ height: '22px', backgroundColor: '#C9A227', mt: 7 }} />

      <Footer />
    </Box>
  );
};

/* ===================== */
/* Reusable Card Component */
/* ===================== */
const SavingsCard = ({ item, index, expanded, handleExpandClick }) => (
  <Card
    data-aos="zoom-in"
    sx={{
      borderRadius: '22px',
      backgroundColor: '#F9FAF7',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      transition: 'all 0.4s ease',
      '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: '0 0 30px rgba(201,162,39,0.6)',
        border: '2px solid #C9A227'
      },
      maxWidth: 520,
      mx: 'auto'
    }}
  >
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: '#0B3D2E' }}>
          <SavingsIcon sx={{ color: '#C9A227' }} />
        </Avatar>
      }
      title={
        <Typography sx={{ fontWeight: 700, color: '#0B3D2E' }}>
          {item.ProductName}
        </Typography>
      }
    />

    {item.ImageURL && (
      <CardMedia
        component="img"
        height="280"
        image={item.ImageURL}
        alt={item.ProductName}
        sx={{ objectFit: 'cover' }}
      />
    )}

    <CardContent>
      <Typography variant="body2" sx={{ color: '#333' }}>
        {item.Intro}
      </Typography>
    </CardContent>

    <CardActions disableSpacing>
      <IconButton
        onClick={() => handleExpandClick(index)}
        sx={{
          marginLeft: 'auto',
          color: '#0B3D2E',
          transform: expanded === index ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'all 0.3s ease',
          '&:hover': {
            color: '#C9A227',
            transform: 'scale(1.2) rotate(180deg)'
          }
        }}
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>

    <Collapse in={expanded === index} timeout="auto" unmountOnExit>
      <CardContent>
        {item.Features && (
          <Box mb={2}>
            <Typography sx={{ fontWeight: 700, color: '#1E6F43' }}>
              Features
            </Typography>
            <Typography variant="body2">{item.Features}</Typography>
          </Box>
        )}
        {item.Benefits && (
          <Box>
            <Typography sx={{ fontWeight: 700, color: '#1E6F43' }}>
              Benefits
            </Typography>
            <Typography variant="body2">{item.Benefits}</Typography>
          </Box>
        )}
      </CardContent>
    </Collapse>
  </Card>
);

export default SavingsProducts;
