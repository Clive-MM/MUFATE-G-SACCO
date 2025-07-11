import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardMedia, CardContent, Collapse,
  IconButton, CardHeader, Avatar
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Slider from 'react-slick';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Footer from '../components/Footer';
import SaccoGallery from './saccogallery';

const ExpandMore = styled(({ expand, ...other }) => <IconButton {...other} />)(
  ({ expand }) => ({
    marginLeft: 'auto',
    color: '#215732',
    transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      color: '#76ff03',
      transform: expand ? 'scale(1.2) rotate(0deg)' : 'scale(1.2) rotate(180deg)'
    }
  })
);

const News = () => {
  const [posts, setPosts] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/posts')
      .then(res => setPosts(res.data.posts))
      .catch(err => console.error('❌ Fetch error:', err));
    AOS.init({ duration: 1000 });
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [{ breakpoint: 900, settings: { slidesToShow: 1 } }]
  };

  const toggleExpand = id => setExpandedId(expandedId === id ? null : id);

  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #215732, #0a3d2e)', py: 6 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: '#fff', fontWeight: 'bold', textTransform: 'uppercase',
          mb: 4, letterSpacing: 1, textShadow: '0 0 6px #f2a922'
        }}
      >
        MUFATE G SACCO NEWS
      </Typography>

      <Box sx={{ maxWidth: 1400, mx: 'auto', px: 2 }}>
        <Slider {...settings}>
          {posts.map(post => (
            <Box key={post.PostID} px={2} data-aos="fade-up">
              <Card
                sx={{
                  borderRadius: 3, backgroundColor: '#fff', boxShadow: 4,
                  transition: 'transform .4s, box-shadow .4s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 0 25px rgba(100,221,23,.6)',
                    border: '2px solid #64dd17'
                  },
                  maxWidth: 640, mx: 'auto'
                }}
              >
                {/* Header with title & date */}
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: '#215732' }}>
                      {post.Title.charAt(0)}
                    </Avatar>
                  }
                  title={post.Title}
                  subheader={new Date(post.DatePosted).toLocaleDateString()}
                  titleTypographyProps={{
                    fontWeight: 700, textTransform: 'uppercase', fontSize: '1rem'
                  }}
                  subheaderTypographyProps={{
                    color: 'text.secondary', fontSize: '.8rem'
                  }}
                />

                {/* Cover image */}
                {post.CoverImage && (
                  <CardMedia
                    component="img"
                    image={post.CoverImage}
                    alt={post.Title}
                    sx={{
                      height: 450,
                      width: '100%',
                      objectFit: 'fit'
                    }}
                  />
                )}

                <CardContent sx={{ pt: 0 }}>
                  <ExpandMore
                    expand={expandedId === post.PostID}
                    onClick={() => toggleExpand(post.PostID)}
                    aria-expanded={expandedId === post.PostID}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardContent>

                <Collapse in={expandedId === post.PostID} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line', color: '#333' }}>
                      {post.Content}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>

      <Box sx={{ height: 20, backgroundColor: '#f2a922', mt: 6 }} />
      <SaccoGallery />
      <Footer />
    </Box>
  );
};

export default News;
