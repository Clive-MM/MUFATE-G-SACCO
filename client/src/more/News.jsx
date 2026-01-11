import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Container, Grid, Card, CardMedia, CardContent,
  IconButton, Avatar, Collapse, Stack, CircularProgress, useTheme, useMediaQuery
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon, 
  CalendarMonth as CalendarIcon,
  NewReleases as NewsIcon,
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import axios from 'axios';
import AOS from 'aos';

// Styles from your Brand Identity
const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
};

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(2, 21, 15, 0.7)',
  backdropFilter: 'blur(20px) saturate(160%)',
  borderRadius: '32px',
  border: `1px solid rgba(255, 255, 255, 0.08)`,
  borderTop: `4px solid ${BRAND.gold}`,
  color: BRAND.light,
  transition: '0.4s all ease-in-out',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 20px ${BRAND.gold}22`,
  }
}));

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const sliderRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/posts')
      .then(res => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Fetch error:', err);
        setLoading(false);
      });
    AOS.init({ duration: 1000 });
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: posts.length > 2,
    speed: 800,
    slidesToShow: isMobile ? 1 : 2,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: dots => <Box sx={{ mt: 4 }}> <ul style={{ margin: "0px" }}> {dots} </ul> </Box>,
  };

  return (
    <Box sx={{
      backgroundColor: BRAND.dark,
      minHeight: '100vh',
      position: 'relative',
      backgroundImage: 'url(https://res.cloudinary.com/djydkcx01/image/upload/v1755499112/ChatGPT_Image_Aug_18_2025_09_37_29_AM_qzkjzi.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      pb: 10
    }}>
      {/* Overlay matching ContactUs */}
      <Box sx={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(to bottom, rgba(2,21,15,0.8) 0%, ${BRAND.dark} 100%)`,
        zIndex: 1
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, pt: { xs: 12, md: 15 } }}>
        
        {/* Header Section */}
        <Stack direction="column" alignItems="center" spacing={2} sx={{ mb: 8, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <Typography sx={{ 
              color: BRAND.gold, 
              fontWeight: 900, 
              letterSpacing: '4px', 
              textTransform: 'uppercase',
              fontSize: '0.9rem' 
            }}>
              Latest Information
            </Typography>
          </motion.div>
          <Typography variant="h2" sx={{ 
            color: '#FFF', 
            fontWeight: 900, 
            fontSize: { xs: '2.5rem', md: '4rem' },
            textTransform: 'uppercase'
          }}>
            Sacco <span style={{ color: BRAND.gold }}>News</span> & Updates
          </Typography>
        </Stack>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: BRAND.gold }} />
          </Box>
        ) : (
          <Box sx={{ px: { xs: 0, md: 4 } }}>
            <Slider ref={sliderRef} {...settings}>
              {posts.map((post) => (
                <Box key={post.PostID} sx={{ p: 2 }}>
                  <GlassCard>
                    {post.CoverImage && (
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="300"
                          image={post.CoverImage}
                          alt={post.Title}
                          sx={{ filter: 'brightness(0.8)' }}
                        />
                        <Box sx={{ 
                          position: 'absolute', top: 20, right: 20, 
                          bgcolor: BRAND.gold, color: BRAND.dark, 
                          px: 2, py: 0.5, borderRadius: '10px', fontWeight: 900, fontSize: '0.75rem'
                        }}>
                          NEW
                        </Box>
                      </Box>
                    )}
                    
                    <CardContent sx={{ p: 4 }}>
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <CalendarIcon sx={{ color: BRAND.gold, fontSize: '1.2rem' }} />
                        <Typography sx={{ color: BRAND.textMuted, fontSize: '0.85rem' }}>
                          {new Date(post.DatePosted).toLocaleDateString('en-GB', { 
                            day: 'numeric', month: 'long', year: 'numeric' 
                          })}
                        </Typography>
                      </Stack>

                      <Typography variant="h5" sx={{ 
                        fontWeight: 800, mb: 2, color: BRAND.gold,
                        lineHeight: 1.3
                      }}>
                        {post.Title}
                      </Typography>

                      <Typography sx={{ 
                        color: BRAND.light, opacity: 0.8, 
                        display: '-webkit-box', WebkitLineClamp: expandedId === post.PostID ? 'none' : 3,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        lineHeight: 1.7
                      }}>
                        {post.Content}
                      </Typography>

                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <IconButton 
                          onClick={() => setExpandedId(expandedId === post.PostID ? null : post.PostID)}
                          sx={{ 
                            bgcolor: 'rgba(236, 155, 20, 0.1)', 
                            color: BRAND.gold,
                            transform: expandedId === post.PostID ? 'rotate(180deg)' : 'none',
                            transition: '0.3s'
                          }}
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                        
                        <Typography sx={{ color: BRAND.gold, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                          {expandedId === post.PostID ? 'Show Less' : 'Read Full Update'}
                        </Typography>
                      </Box>
                    </CardContent>
                  </GlassCard>
                </Box>
              ))}
            </Slider>

            {/* Custom Navigation */}
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 6 }}>
              <IconButton 
                onClick={() => sliderRef.current.slickPrev()}
                sx={{ border: `1px solid ${BRAND.gold}`, color: BRAND.gold }}
              >
                <LeftIcon />
              </IconButton>
              <IconButton 
                onClick={() => sliderRef.current.slickNext()}
                sx={{ border: `1px solid ${BRAND.gold}`, color: BRAND.gold }}
              >
                <RightIcon />
              </IconButton>
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default News;