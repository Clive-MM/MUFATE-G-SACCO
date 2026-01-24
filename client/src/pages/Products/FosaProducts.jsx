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
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../../components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FosaProducts = () => {
  const [fosaLoans, setFosaLoans] = useState([]);
  const [expanded, setExpanded] = useState(null);

  // Standardized Brand Colors
  const COLORS = {
    gold: '#EC9B14',      // Matches BRAND.gold from Footer
    dark: '#02150F',      // Matches BRAND.dark from Footer
    textMuted: 'rgba(244, 244, 244, 0.6)',
    light: '#F4F4F4',
  };

  useEffect(() => {
    axios
      .get('https://mufate-g-sacco.onrender.com/services')
      .then(res => {
        const filtered = res.data.services.filter(
          service => service.ServiceCategory === 'FOSA'
        );
        setfosaLoans(filtered);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 700,
    slidesToShow: Math.min(fosaLoans.length, 3),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <Box
      sx={{
        background: COLORS.dark,
        // Responsive Padding to clear the Navbar
        pt: { xs: 12, md: 18 }, 
        pb: { xs: 6, md: 8 },
      }}
    >
      {/* SECTION TITLE - Standardized Style */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 900,
          textTransform: 'uppercase',
          mb: 8,
          letterSpacing: '3px',
          color: COLORS.gold,
          fontSize: { xs: '1.5rem', md: '2.2rem' },
          textShadow: `0 0 15px ${COLORS.gold}33`,
        }}
      >
        FOSA Loan Products
      </Typography>

      {/* SLIDER */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
        <Slider {...sliderSettings}>
          {fosaLoans.map((loan, index) => (
            <Box key={loan.ServiceID} px={2}>
              <Card
                data-aos="zoom-in"
                sx={{
                  borderRadius: '22px',
                  background: 'rgba(255,255,255,0.98)',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.25)',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: `0 0 28px ${COLORS.gold}55`,
                    border: `1px solid ${COLORS.gold}`,
                  },
                  maxWidth: 500,
                  mx: 'auto',
                  mb: 2
                }}
              >
                {/* CARD HEADER */}
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{
                        background: COLORS.dark,
                        boxShadow: `0 0 10px ${COLORS.gold}50`,
                      }}
                    >
                      <AccountBalanceIcon sx={{ color: COLORS.gold }} />
                    </Avatar>
                  }
                  title={
                    <Typography sx={{ fontWeight: 900, color: COLORS.dark, textTransform: 'uppercase', fontSize: '1rem' }}>
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
                    sx={{ objectFit: 'cover', filter: 'brightness(0.9)' }}
                  />
                )}

                {/* DESCRIPTION */}
                <CardContent>
                  <Typography
                    variant="body2"
                    sx={{ color: '#333', lineHeight: 1.6, fontWeight: 500 }}
                  >
                    {loan.Description}
                  </Typography>
                </CardContent>

                {/* EXPAND BUTTON */}
                <CardActions disableSpacing>
                  <IconButton
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={expanded === index}
                    sx={{
                      ml: 'auto',
                      color: COLORS.dark,
                      transform: expanded === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: '0.3s ease',
                      '&:hover': {
                        color: COLORS.gold,
                      },
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>

                {/* EXPANDABLE CONTENT */}
                <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                  <CardContent sx={{ borderTop: `1px solid rgba(0,0,0,0.05)` }}>
                    {loan.Features && (
                      <Box mb={2}>
                        <Typography
                          sx={{ fontWeight: 800, color: COLORS.gold, textTransform: 'uppercase', fontSize: '0.85rem', mb: 0.5 }}
                        >
                          Features
                        </Typography>
                        <ul style={{ margin: 0, paddingLeft: '20px', color: '#444', fontSize: '0.95rem' }}>
                          {loan.Features.split('.')
                            .filter(f => f.trim())
                            .map((f, i) => (
                              <li key={i}>{f.trim()}</li>
                            ))}
                        </ul>
                      </Box>
                    )}

                    {loan.Benefits && (
                      <Box mb={3}>
                        <Typography
                          sx={{ fontWeight: 800, color: COLORS.gold, textTransform: 'uppercase', fontSize: '0.85rem', mb: 0.5 }}
                        >
                          Benefits
                        </Typography>
                        <ul style={{ margin: 0, paddingLeft: '20px', color: '#444', fontSize: '0.95rem' }}>
                          {loan.Benefits.split('.')
                            .filter(b => b.trim())
                            .map((b, i) => (
                              <li key={i}>{b.trim()}</li>
                            ))}
                        </ul>
                      </Box>
                    )}

                    {/* DOWNLOAD FORM BUTTON - Standardized Style */}
                    {loan.LoanFormURL && (
                      <Box mt={2} textAlign="center">
                        <a
                          href={loan.LoanFormURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            background: COLORS.dark,
                            color: COLORS.gold,
                            fontWeight: 800,
                            padding: '12px 28px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            fontSize: '0.8rem',
                            letterSpacing: '1px',
                            boxShadow: `0 4px 15px rgba(0,0,0,0.2)`,
                            transition: '0.3s ease',
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = COLORS.gold;
                            e.currentTarget.style.color = COLORS.dark;
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = COLORS.dark;
                            e.currentTarget.style.color = COLORS.gold;
                          }}
                        >
                          Download Application Form
                        </a>
                      </Box>
                    )}
                  </CardContent>
                </Collapse>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* GOLD DIVIDER */}
      <Box
        sx={{
          height: '4px',
          background: COLORS.gold,
          mt: 8,
          opacity: 0.3
        }}
      />

      <Footer />
    </Box>
  );
};

export default FosaProducts;