import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Container, Grid, CardContent, IconButton, 
  Stack, CircularProgress, Button, TextField, InputAdornment, 
  Divider, useTheme, useMediaQuery
} from '@mui/material';
import { 
  CalendarMonth as CalendarIcon, ChevronLeft as LeftIcon, 
  ChevronRight as RightIcon, ArrowForward as ArrowIcon,
  Search as SearchIcon, Whatshot as HotIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion, useScroll, useSpring } from 'framer-motion';
import Slider from 'react-slick';
import axios from 'axios';
import AOS from 'aos';

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
  glass: 'rgba(2, 21, 15, 0.7)'
};

const EnhancedGlassCard = styled(motion.div)({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(15px)',
  borderRadius: '30px',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  overflow: 'hidden',
  height: '100%',
  transition: 'border 0.3s ease',
  '&:hover': {
    border: `1px solid ${BRAND.gold}`,
  }
});

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const sliderRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Scroll progress logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/posts')
      .then(res => {
        const sorted = res.data.posts.sort((a, b) => new Date(b.DatePosted) - new Date(a.DatePosted));
        setPosts(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    AOS.init({ duration: 1000, once: true });
  }, []);

  const featured = posts[0];
  const icymiPosts = posts.slice(1, 5); 
  const filteredPosts = posts.filter(p => p.Title.toLowerCase().includes(searchQuery.toLowerCase()));

  const sliderSettings = {
    dots: false,
    infinite: filteredPosts.length > 1,
    speed: 800,
    slidesToShow: isMobile ? 1 : 2,
    slidesToScroll: 1,
    autoplay: true,
  };

  if (loading) return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: BRAND.dark }}>
      <CircularProgress sx={{ color: BRAND.gold }} />
    </Box>
  );

  return (
    <Box sx={{ bgcolor: BRAND.dark, minHeight: '100vh', position: 'relative' }}>
      
      {/* Scroll Progress Bar */}
      <motion.div style={{ 
        scaleX, position: 'fixed', top: 0, left: 0, right: 0, 
        height: 4, background: BRAND.gold, transformOrigin: '0%', zIndex: 2000 
      }} />

      {/* 1. CINEMA HERO (Latest Post) */}
      {featured && (
        <Box sx={{ position: 'relative', height: '90vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <motion.div
            initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
            style={{ 
                position: 'absolute', inset: 0, 
                backgroundImage: `url(${featured.CoverImage})`, 
                backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 
            }}
          />
          <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${BRAND.dark} 10%, rgba(2,21,15,0.3) 100%)`, zIndex: 1 }} />
          
          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <Stack spacing={2} sx={{ maxWidth: '850px' }}>
                <Typography sx={{ color: BRAND.gold, fontWeight: 900, letterSpacing: '6px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                  Headline News
                </Typography>
                <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5.5rem' }, fontWeight: 900, color: '#FFF', lineHeight: 0.9 }}>
                  {featured.Title}
                </Typography>
                <Typography sx={{ color: BRAND.light, opacity: 0.8, fontSize: '1.2rem', maxWidth: '600px', my: 3 }}>
                  {featured.Content.substring(0, 150)}...
                </Typography>
                <Button variant="outlined" endIcon={<ArrowIcon />} sx={{ 
                    borderColor: BRAND.gold, color: BRAND.gold, px: 4, py: 1.5, 
                    borderRadius: '0px', borderWidth: '2px', fontWeight: 900,
                    '&:hover': { borderWidth: '2px', bgcolor: BRAND.gold, color: BRAND.dark }
                }}>
                  OPEN STORY
                </Button>
              </Stack>
            </motion.div>
          </Container>
        </Box>
      )}

      {/* 2. MAIN FEED & SIDEBAR SECTION */}
      <Container maxWidth="xl" sx={{ py: 15 }}>
        <Grid container spacing={8}>
          
          {/* LEFT: Main Feed */}
          <Grid item xs={12} md={8}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 8 }}>
              <Box>
                <Typography variant="h2" sx={{ color: '#FFF', fontWeight: 900, mb: 1 }}>THE <span style={{ color: BRAND.gold }}>ARCHIVE</span></Typography>
                <Box sx={{ width: 80, height: 4, bgcolor: BRAND.gold }} />
              </Box>
              
              <TextField 
                variant="standard"
                placeholder="Search articles..."
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: BRAND.gold }} /></InputAdornment>,
                  style: { color: '#FFF', fontSize: '1.2rem' }
                }}
                sx={{ width: { xs: '100%', md: '300px' }, '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.2)' } }}
              />
            </Stack>

            <Slider ref={sliderRef} {...sliderSettings}>
              {filteredPosts.map((post) => (
                <Box key={post.PostID} sx={{ px: 2, pb: 5 }}>
                  <EnhancedGlassCard whileHover={{ y: -10 }}>
                    <Box sx={{ height: 280, overflow: 'hidden' }}>
                        <motion.img 
                            src={post.CoverImage} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            whileHover={{ scale: 1.1 }}
                        />
                    </Box>
                    <CardContent sx={{ p: 4 }}>
                      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ color: BRAND.gold, fontWeight: 900 }}>{new Date(post.DatePosted).toLocaleDateString()}</Typography>
                        <Typography variant="caption" sx={{ color: BRAND.textMuted }}>• 5 MIN READ</Typography>
                      </Stack>
                      <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 800, mb: 2, minHeight: '60px' }}>{post.Title}</Typography>
                      <Typography sx={{ color: BRAND.textMuted, fontSize: '0.95rem', mb: 3 }}>{post.Content.substring(0, 110)}...</Typography>
                      <Button sx={{ color: BRAND.gold, p: 0, fontWeight: 900, letterSpacing: '1px' }}>READ FULL</Button>
                    </CardContent>
                  </EnhancedGlassCard>
                </Box>
              ))}
            </Slider>
          </Grid>

          {/* RIGHT: ICYMI Sidebar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 100 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4 }}>
                    <HotIcon sx={{ color: BRAND.gold }} />
                    <Typography variant="h5" sx={{ fontWeight: 900, color: '#FFF', letterSpacing: '2px' }}>ICYMI</Typography>
                </Stack>
                
                <Stack spacing={4}>
                    {icymiPosts.map((post, i) => (
                        <motion.div key={i} whileHover={{ x: 10 }} style={{ cursor: 'pointer' }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={4}>
                                    <Box sx={{ height: 80, borderRadius: '15px', overflow: 'hidden' }}>
                                        <img src={post.CoverImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                                    </Box>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="body2" sx={{ color: '#FFF', fontWeight: 700, lineHeight: 1.3, mb: 0.5 }}>{post.Title}</Typography>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <TimeIcon sx={{ fontSize: '0.8rem', color: BRAND.gold }} />
                                        <Typography variant="caption" sx={{ color: BRAND.textMuted }}>{new Date(post.DatePosted).getMonth() + 1} Months Ago</Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </motion.div>
                    ))}
                </Stack>

                <Box sx={{ mt: 6, p: 4, borderRadius: '20px', border: `1px dashed ${BRAND.gold}`, textAlign: 'center' }}>
                    <Typography sx={{ color: BRAND.gold, fontWeight: 900, mb: 1 }}>WANT TO CONTRIBUTE?</Typography>
                    <Typography variant="caption" sx={{ color: BRAND.textMuted, display: 'block', mb: 2 }}>Members can submit community stories for our next update.</Typography>
                    <Button size="small" sx={{ color: '#FFF', fontWeight: 900 }}>CONTACT MEDIA TEAM</Button>
                </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default News;