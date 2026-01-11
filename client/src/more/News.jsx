import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Container, Card, CardMedia, CardContent,
  IconButton, Stack, CircularProgress, useTheme, useMediaQuery, Badge
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon, 
  CalendarMonth as CalendarIcon,
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import axios from 'axios';
import AOS from 'aos';

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
};

// Styled Glass Card with enhanced hover glow
const EnhancedGlassCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(2, 21, 15, 0.6)',
  backdropFilter: 'blur(25px) saturate(180%)',
  borderRadius: '40px',
  border: `1px solid rgba(255, 255, 255, 0.08)`,
  borderTop: `4px solid ${BRAND.gold}`,
  color: BRAND.light,
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',
  '&:hover': {
    borderTop: `4px solid #FFC107`,
    boxShadow: `0 30px 60px rgba(0,0,0,0.8), 0 0 30px ${BRAND.gold}33`,
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
    // Simulated API call - Replace with your Render URL
    axios.get('https://mufate-g-sacco.onrender.com/posts')
      .then(res => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    AOS.init({ duration: 1200, once: true });
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: posts.length > 2,
    speed: 1000,
    slidesToShow: isMobile ? 1 : 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.6, 0.05, 0.01, 0.9)",
  };

  return (
    <Box sx={{
      backgroundColor: BRAND.dark,
      minHeight: '100vh',
      backgroundImage: 'url(https://res.cloudinary.com/djydkcx01/image/upload/v1755499112/ChatGPT_Image_Aug_18_2025_09_37_29_AM_qzkjzi.png)',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Overlay */}
      <Box sx={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(to bottom, rgba(2,21,15,0.85) 0%, ${BRAND.dark} 100%)`,
        zIndex: 1
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, pt: { xs: 15, md: 20 }, pb: 10 }}>
        
        {/* Animated Title Section */}
        <Stack direction="column" alignItems="center" sx={{ mb: 10, textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TrendingIcon sx={{ color: BRAND.gold }} />
                <Typography sx={{ color: BRAND.gold, fontWeight: 900, letterSpacing: '6px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                  Latest Updates
                </Typography>
             </Box>
          </motion.div>

          <Typography variant="h1" sx={{ 
            color: '#FFF', 
            fontWeight: 900, 
            fontSize: { xs: '2.8rem', md: '5rem' },
            textTransform: 'uppercase',
            lineHeight: 1,
            mb: 2
          }}>
            SACCO <span style={{ color: BRAND.gold, WebkitTextStroke: '1px #EC9B14', WebkitTextFillColor: 'transparent' }}>NEWS</span>
          </Typography>
          
          <Box sx={{ width: '80px', height: '4px', bgcolor: BRAND.gold, borderRadius: '2px' }} />
        </Stack>

        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10 }}>
            <CircularProgress sx={{ color: BRAND.gold, mb: 2 }} />
            <Typography sx={{ color: BRAND.gold }}>Fetching Golden Updates...</Typography>
          </Box>
        ) : (
          <Box sx={{ px: { xs: 1, md: 4 } }}>
            <Slider ref={sliderRef} {...settings}>
              {posts.map((post, index) => (
                <Box key={post.PostID} sx={{ p: { xs: 1, md: 3 }, height: '100%' }}>
                  <EnhancedGlassCard
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Image with Parallax Hover */}
                    <Box sx={{ height: 320, overflow: 'hidden', position: 'relative' }}>
                      <motion.img 
                        src={post.CoverImage} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.6 }}
                      />
                      <Box sx={{ 
                        position: 'absolute', bottom: 0, left: 0, right: 0, 
                        p: 2, background: 'linear-gradient(to top, rgba(2,21,15,1), transparent)' 
                      }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <CalendarIcon sx={{ color: BRAND.gold, fontSize: '1rem' }} />
                          <Typography sx={{ color: '#FFF', fontSize: '0.75rem', fontWeight: 600 }}>
                             {new Date(post.DatePosted).toLocaleDateString('en-KE', { dateStyle: 'long' })}
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>

                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" sx={{ 
                        fontWeight: 900, color: BRAND.gold, mb: 2, 
                        minHeight: '60px', overflow: 'hidden' 
                      }}>
                        {post.Title}
                      </Typography>

                      <Typography sx={{ 
                        color: BRAND.light, opacity: 0.7, fontSize: '0.95rem',
                        lineHeight: 1.8, mb: 4,
                        display: '-webkit-box', 
                        WebkitLineClamp: expandedId === post.PostID ? 'none' : 3,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden'
                      }}>
                        {post.Content}
                      </Typography>

                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                         <IconButton 
                           onClick={(e) => {
                             e.stopPropagation();
                             setExpandedId(expandedId === post.PostID ? null : post.PostID);
                           }}
                           sx={{ 
                             bgcolor: 'rgba(236, 155, 20, 0.15)', color: BRAND.gold,
                             transition: '0.4s',
                             '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark }
                           }}
                         >
                           <ExpandMoreIcon sx={{ 
                             transform: expandedId === post.PostID ? 'rotate(180deg)' : 'none' 
                           }} />
                         </IconButton>

                         <Typography 
                           variant="button" 
                           sx={{ color: BRAND.gold, fontWeight: 900, letterSpacing: '2px', fontSize: '0.7rem' }}
                         >
                            {expandedId === post.PostID ? 'CLOSE ARTICLE' : 'VIEW DETAILS'}
                         </Typography>
                      </Stack>
                    </CardContent>
                  </EnhancedGlassCard>
                </Box>
              ))}
            </Slider>

            {/* Premium Controls */}
            <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 10 }}>
              <IconButton 
                onClick={() => sliderRef.current.slickPrev()}
                sx={{ 
                  width: 60, height: 60, border: `1px solid rgba(236, 155, 20, 0.3)`, 
                  color: BRAND.gold, transition: '0.3s',
                  '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark, transform: 'scale(1.1)' }
                }}
              >
                <LeftIcon />
              </IconButton>
              <IconButton 
                onClick={() => sliderRef.current.slickNext()}
                sx={{ 
                  width: 60, height: 60, border: `1px solid rgba(236, 155, 20, 0.3)`, 
                  color: BRAND.gold, transition: '0.3s',
                  '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark, transform: 'scale(1.1)' }
                }}
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