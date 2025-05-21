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
    axios.get('http://127.0.0.1:5000/products')
      .then(res => {
        setSavings(res.data.products);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const uniqueFilteredSavings = Array.from(
    new Map(
      savings
        .filter(item => item.ProductName.toLowerCase().includes(searchTerm.toLowerCase()))
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
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #215732, #0a3d2e)', py: 6 }}>
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
        Savings Products
      </Typography>

      <Box sx={{ maxWidth: 400, mx: 'auto', mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search savings product..."
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ backgroundColor: '#fff', borderRadius: 2 }}
        />
      </Box>

      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
        {searchTerm ? (
          uniqueFilteredSavings.map((item, index) => (
            <Box key={item.ProductID} px={2} mb={4}>
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
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: '#215732' }}><SavingsIcon /></Avatar>}
                  title={item.ProductName}
                  subheader={item.CreatedAt}
                />

                {item.ImageURL && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.ImageURL}
                    alt={item.ProductName}
                    sx={{ objectFit: 'cover' }}
                  />
                )}

                <CardContent>
                  <Typography variant="body2" sx={{ color: '#555' }}>{item.Intro}</Typography>
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
                        <Typography sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Features</Typography>
                        <Typography variant="body2" sx={{ color: '#444' }}>{item.Features}</Typography>
                      </Box>
                    )}
                    {item.Benefits && (
                      <Box>
                        <Typography sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Benefits</Typography>
                        <Typography variant="body2" sx={{ color: '#444' }}>{item.Benefits}</Typography>
                      </Box>
                    )}
                  </CardContent>
                </Collapse>
              </Card>
            </Box>
          ))
        ) : (
          <Slider {...sliderSettings}>
            {uniqueFilteredSavings.map((item, index) => (
              <Box key={item.ProductID} px={2}>
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
                  <CardHeader
                    avatar={<Avatar sx={{ bgcolor: '#215732' }}><SavingsIcon /></Avatar>}
                    title={item.ProductName}
                    subheader={item.CreatedAt}
                  />

                  {item.ImageURL && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.ImageURL}
                      alt={item.ProductName}
                      sx={{ objectFit: 'cover' }}
                    />
                  )}

                  <CardContent>
                    <Typography variant="body2" sx={{ color: '#555' }}>{item.Intro}</Typography>
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
                          <Typography sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Features</Typography>
                          <Typography variant="body2" sx={{ color: '#444' }}>{item.Features}</Typography>
                        </Box>
                      )}
                      {item.Benefits && (
                        <Box>
                          <Typography sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Benefits</Typography>
                          <Typography variant="body2" sx={{ color: '#444' }}>{item.Benefits}</Typography>
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

      <Box sx={{ height: '20px', backgroundColor: '#f2a922', mt: 6 }} />
      <Footer />
    </Box>
  );
};

export default SavingsProducts;
