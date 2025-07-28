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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Icon for loans
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../../components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FosaProducts = () => {
  const [fosaLoans, setFosaLoans] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/services')
      .then(res => {
        const filtered = res.data.services.filter(service => service.ServiceCategory === 'FOSA');
        setFosaLoans(filtered);
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
    <Box sx={{ background: 'linear-gradient(to bottom, #5cdf0aff, #9ff107)', py: 6 }}>
      {/* Section Title */}
      <Typography
        variant="h5"
        align="center"
        sx={{
          color: '#fff',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          mb: 4,
          letterSpacing: '1px',
          textShadow: '0 0 6px #f2a922'
        }}
      >
        FOSA Loan Products
      </Typography>

      {/* Slider */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
        <Slider {...sliderSettings}>
          {fosaLoans.map((loan, index) => (
            <Box key={loan.ServiceID} px={2}>
              <Card
                data-aos="zoom-in"
                sx={{
                  borderRadius: '20px',
                  backgroundColor: '#fff',
                  boxShadow: 4,
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 0 25px rgba(100, 221, 23, 0.6)',
                    border: '2px solid #64dd17'
                  },
                  maxWidth: 500,
                  mx: 'auto'
                }}
              >
                {/* Card Header */}
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: '#215732' }}>
                      <AccountBalanceIcon />
                    </Avatar>
                  }
                  title={loan.ServiceName}
                />

                {/* Card Image */}
                {loan.ImageURL && (
                  <CardMedia
                    component="img"
                    height="250"
                    image={loan.ImageURL}
                    alt={loan.ServiceName}
                    sx={{ objectFit: 'cover' }}
                  />
                )}

                {/* Short Description */}
                <CardContent>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    {loan.Description}
                  </Typography>
                </CardContent>

                {/* Expand Button */}
                <CardActions disableSpacing>
                  <IconButton
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={expanded === index}
                    aria-label="show more"
                    sx={{
                      marginLeft: 'auto',
                      color: '#215732',
                      transform: expanded === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        color: '#76ff03',
                        transform: 'scale(1.2) rotate(180deg)',
                      }
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>

                {/* Expandable Section */}
                <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                  <CardContent>
                    {/* Features as bullet points */}
                    {loan.Features && (
                      <Box mb={2}>
                        <Typography sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Features</Typography>
                        <ul style={{ margin: 0, paddingLeft: '20px', color: '#444' }}>
                          {loan.Features.split('.').filter(f => f.trim() !== '').map((f, i) => (
                            <li key={i} style={{ marginBottom: '4px' }}>{f.trim()}</li>
                          ))}
                        </ul>
                      </Box>
                    )}

                    {/* Benefits as bullet points */}
                    {loan.Benefits && (
                      <Box>
                        <Typography sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Benefits</Typography>
                        <ul style={{ margin: 0, paddingLeft: '20px', color: '#444' }}>
                          {loan.Benefits.split('.').filter(b => b.trim() !== '').map((b, i) => (
                            <li key={i} style={{ marginBottom: '4px' }}>{b.trim()}</li>
                          ))}
                        </ul>
                      </Box>
                    )}

                    {/* Download Button */}
                    {loan.LoanFormURL && (
                      <Box sx={{ mt: 2 }}>
                        <a
                          href={loan.LoanFormURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            background: 'linear-gradient(90deg, #64dd17, #76ff03)',
                            color: '#fff',
                            fontWeight: 'bold',
                            padding: '10px 20px',
                            borderRadius: '30px',
                            textDecoration: 'none',
                            boxShadow: '0 0 12px rgba(118, 255, 3, 0.6)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          Download Form
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

      {/* Footer Divider and Footer */}
      <Box sx={{ height: '20px', backgroundColor: '#f2a922', mt: 6 }} />
      <Footer />
    </Box>
  );
};

export default FosaProducts;
