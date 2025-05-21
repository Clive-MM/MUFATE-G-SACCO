import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardActionArea, Button } from '@mui/material';
import Footer from '../../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FosaProducts = () => {
  const [fosaLoans, setFosaLoans] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/services')
      .then(res => {
        const filtered = res.data.services.filter(service => service.ServiceCategory === 'FOSA');
        setFosaLoans(filtered);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Box sx={{ backgroundColor: '#fff', overflow: 'hidden', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          position: 'relative',
          height: '60px',
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Typography
          sx={{
            backgroundColor: '#fff',
            px: 3,
            py: 1,
            zIndex: 2,
            color: '#002d5a',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: '1rem',
            letterSpacing: '1px',
            textShadow: '0 0 5px #64dd17, 0 0 10px #64dd17',
            animation: 'fadeInGlow 1.5s ease forwards',
            cursor: 'default',
            '&:hover': {
              color: '#76ff03',
              textShadow: '0 0 8px #76ff03, 0 0 16px #76ff03',
              transform: 'scale(1.03)',
            },
          }}
        >
          FOSA Loan Products
        </Typography>

        <Box
          sx={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: '180px',
            width: 'calc(100% - 180px)',
            height: '100%',
            backgroundColor: '#215732',
            zIndex: 1,
          }}
        />
      </Box>

      {/* Grid */}
      <Box
        sx={{
          background: 'linear-gradient(to bottom, #215732, #0a3d2e)',
          px: 2,
          py: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: '1100px',
            mx: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {fosaLoans.map((loan, index) => (
            <Card
              key={loan.ServiceID}
              data-aos="fade-up"
              sx={{
                backgroundColor: '#fff',
                padding: '1rem 1.25rem',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                width: '100%',
                maxWidth: '330px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                boxShadow: 3,
                cursor: 'pointer',
                textAlign: 'center',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardActionArea sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {loan.ImageURL && (
                    <Box
                      component="img"
                      src={loan.ImageURL}
                      alt={loan.ServiceName}
                      sx={{
                        width: 150,
                        height: 150,
                        objectFit: 'cover',
                        borderRadius: '16px',
                        mb: 2,
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.03)',
                        },
                      }}
                    />
                  )}

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ textTransform: 'uppercase', color: '#215732', mb: 1 }}
                  >
                    {loan.ServiceName}
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#444', mb: 2 }}>
                    {loan.Description}
                  </Typography>

                  {loan.LoanFormURL && (
                    <Button
                      href={loan.LoanFormURL}
                      target="_blank"
                      download
                      sx={{
                        backgroundColor: '#64dd17',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '30px',
                        px: 3,
                        py: 1,
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
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>

      <Box sx={{ height: '20px', backgroundColor: '#f2a922' }} />
      <Footer />
    </Box>
  );
};

export default FosaProducts;
