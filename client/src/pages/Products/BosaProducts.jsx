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
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #5cdf0aff, #9ff107)', py: 6 }}>
      {/* Heading */}
      <Typography
        variant="h5"
        align="center"
        sx={{
          color: '#fff',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          mb: 4,
          letterSpacing: '1px',
          textShadow: '0 0 6px #f2a922',
        }}
      >
        BOSA Loan Products
      </Typography>

      {/* Search */}
      <Box sx={{ maxWidth: 400, mx: 'auto', mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search BOSA loan..."
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ backgroundColor: '#fff', borderRadius: 2 }}
        />
      </Box>

      {/* Main Section */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
        {searchTerm ? (
          filteredLoans.map((loan, index) => (
            <Box key={loan.ServiceID} px={2} mb={4}>
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
                    border: '2px solid #64dd17',
                  },
                  maxWidth: 500,
                  mx: 'auto',
                }}
              >
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: '#215732' }}><AccountBalanceIcon /></Avatar>}
                  title={loan.ServiceName}
                />

                {loan.ImageURL && (
                  <CardMedia
                    component="img"
                    height="350"
                    image={loan.ImageURL}
                    alt={loan.ServiceName}
                    sx={{ objectFit: 'cover' }}
                  />
                )}

                <CardContent>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    {loan.Description}
                  </Typography>
                </CardContent>

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
                      },
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>

                <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                  <CardContent>
                    {loan.Features && (
                      <Box mb={2}>
                        <Typography sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Features</Typography>
                        <Typography variant="body2" sx={{ color: '#444' }}>
                          {loan.Features}
                        </Typography>
                      </Box>
                    )}
                    {loan.Benefits && (
                      <Box>
                        <Typography sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Benefits</Typography>
                        <Typography variant="body2" sx={{ color: '#444' }}>
                          {loan.Benefits}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Collapse>
              </Card>
            </Box>
          ))
        ) : (
          <Slider {...sliderSettings}>
            {filteredLoans.map((loan, index) => (
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
                      border: '2px solid #64dd17',
                    },
                    maxWidth: 500,
                    mx: 'auto',
                  }}
                >
                  <CardHeader
                    avatar={<Avatar sx={{ bgcolor: '#215732' }}><AccountBalanceIcon /></Avatar>}
                    title={loan.ServiceName}
                  />

                  {loan.ImageURL && (
                    <CardMedia
                      component="img"
                      height="300"
                      image={loan.ImageURL}
                      alt={loan.ServiceName}
                      sx={{ objectFit: 'cover' }}
                    />
                  )}

                  <CardContent>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      {loan.Description}
                    </Typography>
                  </CardContent>

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
                        },
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>

                  <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                    <CardContent>
                      {loan.Features && (
                        <Box mb={2}>
                          <Typography sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Features</Typography>
                          <Typography variant="body2" sx={{ color: '#444' }}>
                            {loan.Features}
                          </Typography>
                        </Box>
                      )}
                      {loan.Benefits && (
                        <Box>
                          <Typography sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Benefits</Typography>
                          <Typography variant="body2" sx={{ color: '#444' }}>
                            {loan.Benefits}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Collapse>
                </Card>
              </Box>
            ))}
          </Slider>
        )}
      </Box>

      {/* Footer */}
      <Box sx={{ height: '20px', backgroundColor: '#f2a922', mt: 6 }} />
      <Footer />
    </Box>
  );
};

export default BosaProducts;
