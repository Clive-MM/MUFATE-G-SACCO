import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button
} from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../../components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FosaProducts = () => {
  const [fosaLoans, setFosaLoans] = useState([]);

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

 const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,              // Slide transition speed (ms)
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,     // Delay between slides (ms) – adjust as needed
  pauseOnHover: true,      // Pause when user hovers on card
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};

  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #215732, #0a3d2e)', py: 6 }}>
      {/* Section Heading */}
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
          {fosaLoans.map((loan) => (
            <Box key={loan.ServiceID} px={2}>
              <Card
                data-aos="zoom-in"
                sx={{
                  borderRadius: '20px',
                  boxShadow: 4,
                  height: '100%',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 0 25px rgba(100, 221, 23, 0.6)',
                    border: '2px solid #64dd17',
                  },
                }}
              >
                {loan.ImageURL && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={loan.ImageURL}
                    alt={loan.ServiceName}
                    sx={{
                      objectFit: 'cover',
                      borderTopLeftRadius: '20px',
                      borderTopRightRadius: '20px',
                    }}
                  />
                )}
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#215732',
                      textTransform: 'uppercase',
                      mb: 1
                    }}
                  >
                    {loan.ServiceName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#555', minHeight: '60px' }}
                  >
                    {loan.Description}
                  </Typography>
                  {loan.LoanFormURL && (
                    <Button
                      href={loan.LoanFormURL}
                      target="_blank"
                      download
                      sx={{
                        mt: 2,
                        backgroundColor: '#64dd17',
                        color: '#fff',
                        fontWeight: 'bold',
                        px: 3,
                        py: 1,
                        borderRadius: '30px',
                        boxShadow: '0 0 10px #64dd17',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#76ff03',
                          boxShadow: '0 0 20px #76ff03',
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      Download Form
                    </Button>
                  )}
                </CardContent>
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
