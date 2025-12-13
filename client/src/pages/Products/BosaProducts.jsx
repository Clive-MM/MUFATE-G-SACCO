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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../../components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BosaProducts = () => {
  const [bosaLoans, setBosaLoans] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://mufate-g-sacco.onrender.com/services')
      .then((res) => {
        const filtered = res.data.services.filter(
          (service) => service.ServiceCategory === 'BOSA'
        );
        setBosaLoans(filtered);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const filteredLoans = Array.from(
    new Map(
      bosaLoans
        .filter((loan) =>
          loan.ServiceName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((loan) => [loan.ServiceID, loan])
    ).values()
  );

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 700,
    slidesToShow: Math.min(filteredLoans.length, 2),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ],
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #011B0A, #012A12)',
        py: { xs: 6, md: 8 },
      }}
    >
      {/* SECTION TITLE */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 900,
          textTransform: 'uppercase',
          mb: 4,
          letterSpacing: '1px',
          background: 'linear-gradient(to right, #FFD700, #F9E7C5)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 12px rgba(255,215,0,0.45)',
        }}
      >
        BOSA Loan Products
      </Typography>

      {/* SEARCH BAR */}
      <Box sx={{ maxWidth: 420, mx: 'auto', mb: 5 }}>
        <TextField
          fullWidth
          placeholder="Search BOSA loan..."
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '14px',
            boxShadow: '0 0 18px rgba(255,215,0,0.25)',
            '& .MuiOutlinedInput-root': {
              fontWeight: 600,
            },
          }}
        />
      </Box>

      {/* CONTENT */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
        {searchTerm ? (
          filteredLoans.map((loan, index) => (
            <Box key={loan.ServiceID} px={2} mb={4}>
              <LoanCard
                loan={loan}
                index={index}
                expanded={expanded}
                handleExpandClick={handleExpandClick}
              />
            </Box>
          ))
        ) : (
          <Slider {...sliderSettings}>
            {filteredLoans.map((loan, index) => (
              <Box key={loan.ServiceID} px={2}>
                <LoanCard
                  loan={loan}
                  index={index}
                  expanded={expanded}
                  handleExpandClick={handleExpandClick}
                />
              </Box>
            ))}
          </Slider>
        )}
      </Box>

      {/* GOLD DIVIDER */}
      <Box
        sx={{
          height: '16px',
          background: 'linear-gradient(to right, #FFD700, #F9E7C5)',
          mt: 6,
        }}
      />

      <Footer />
    </Box>
  );
};

/* ======================
   SHARED LOAN CARD
====================== */
const LoanCard = ({ loan, index, expanded, handleExpandClick }) => (
  <Card
    data-aos="zoom-in"
    sx={{
      borderRadius: '22px',
      background: 'rgba(255,255,255,0.96)',
      boxShadow: '0 8px 28px rgba(0,0,0,0.25)',
      transition: '0.35s ease',
      '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: '0 0 28px rgba(255,215,0,0.55)',
        border: '1px solid rgba(255,215,0,0.6)',
      },
      maxWidth: 500,
      mx: 'auto',
    }}
  >
    {/* HEADER */}
    <CardHeader
      avatar={
        <Avatar
          sx={{
            background: 'linear-gradient(135deg, #013D19, #0A5A2A)',
            boxShadow: '0 0 12px rgba(255,215,0,0.5)',
          }}
        >
          <AccountBalanceIcon sx={{ color: '#FFD700' }} />
        </Avatar>
      }
      title={
        <Typography sx={{ fontWeight: 700, color: '#013D19' }}>
          {loan.ServiceName}
        </Typography>
      }
    />

    {/* IMAGE */}
    {loan.ImageURL && (
      <CardMedia
        component="img"
        height="250"
        image={loan.ImageURL}
        alt={loan.ServiceName}
        sx={{ objectFit: 'cover' }}
      />
    )}

    {/* DESCRIPTION */}
    <CardContent>
      <Typography sx={{ color: '#333', lineHeight: 1.6 }}>
        {loan.Description}
      </Typography>
    </CardContent>

    {/* EXPAND BUTTON */}
    <CardActions disableSpacing>
      <IconButton
        onClick={() => handleExpandClick(index)}
        sx={{
          ml: 'auto',
          color: '#013D19',
          transform: expanded === index ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: '0.3s ease',
          '&:hover': {
            color: '#FFD700',
            transform: 'scale(1.2) rotate(180deg)',
          },
        }}
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>

    {/* EXPANDED CONTENT */}
    <Collapse in={expanded === index} timeout="auto" unmountOnExit>
      <CardContent>
        {loan.Features && (
          <Box mb={2}>
            <Typography sx={{ fontWeight: 800, color: '#013D19' }}>
              Features
            </Typography>
            <Typography sx={{ color: '#333' }}>
              {loan.Features}
            </Typography>
          </Box>
        )}

        {loan.Benefits && (
          <Box mb={2}>
            <Typography sx={{ fontWeight: 800, color: '#013D19' }}>
              Benefits
            </Typography>
            <Typography sx={{ color: '#333' }}>
              {loan.Benefits}
            </Typography>
          </Box>
        )}

        {loan.LoanFormURL && (
          <Box mt={2}>
            <a
              href={loan.LoanFormURL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #013D19, #0A5A2A)',
                color: '#FFD700',
                fontWeight: 800,
                padding: '10px 22px',
                borderRadius: '30px',
                textDecoration: 'none',
                border: '1px solid rgba(255,215,0,0.45)',
                boxShadow: '0 0 18px rgba(255,215,0,0.45)',
                transition: '0.3s ease',
              }}
            >
              Download Form
            </a>
          </Box>
        )}
      </CardContent>
    </Collapse>
  </Card>
);

export default BosaProducts;
