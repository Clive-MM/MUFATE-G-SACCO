import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

const BosaProducts = () => {
  const [bosaLoans, setBosaLoans] = useState([]);

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/services')
      .then(res => {
        const filtered = res.data.services.filter(service => service.ServiceCategory === 'BOSA');
        setBosaLoans(filtered);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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
        BOSA Loan Products
      </Typography>

      {/* Grid */}
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: 2,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr'
          },
          gap: 4
        }}
      >
        {bosaLoans.map((loan) => (
          <Card
            key={loan.ServiceID}
            data-aos="zoom-in"
            sx={{
              borderRadius: '20px',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              boxShadow: 4,
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              cursor: 'pointer',
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
                image={loan.ImageURL}
                alt={loan.ServiceName}
                sx={{
                  height: 300,
                  width: '100%',
                  objectFit: 'cover',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                }}
              />
            )}
            <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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
                sx={{ color: '#555', mb: 2, flexGrow: 1 }}
              >
                {loan.Description}
              </Typography>
              {loan.LoanFormURL && (
                <Button
                  href={loan.LoanFormURL}
                  target="_blank"
                  download
                  sx={{
                    mt: 'auto',
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
        ))}
      </Box>

      {/* Footer Divider and Footer */}
      <Box sx={{ height: '20px', backgroundColor: '#f2a922', mt: 6 }} />
      <Footer />
    </Box>
  );
};

export default BosaProducts;
