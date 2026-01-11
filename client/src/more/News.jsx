import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Container, Grid, CardContent, IconButton, 
  Stack, CircularProgress, Button, TextField, InputAdornment, 
  useTheme, useMediaQuery
} from '@mui/material';
import { 
  CalendarMonth as CalendarIcon, ChevronLeft as LeftIcon, 
  ChevronRight as RightIcon, Search as SearchIcon, 
  Whatshot as HotIcon, AccessTime as TimeIcon
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
  glass: 'rgba(255, 255, 255, 0.03)'
};

const EnhancedGlassCard = styled(motion.div)({
  background: BRAND.glass,
  backdropFilter: 'blur(15px)',
  borderRadius: '30px',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  overflow: 'hidden',
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    border: `1px solid ${BRAND.gold}`,
    background: 'rgba(255, 255, 255, 0.05)',
  }
});

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const sliderRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
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

  const icymiPosts = posts.slice(0, 4); 
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
        height: 3, background: BRAND.gold, transformOrigin: '0%', zIndex: 2000 
      }} />

      {/* Main Content - Reduced Padding-Top to bring heading closer to navbar */}
      <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 }, pb: 10 }}>
        <Grid container spacing={6}>
          
          {/* LEFT: Main Feed */}
          <Grid item xs={12} md={8}>
            <Stack 
              direction={{ xs: 'column', md: 'row' }} 
              justifyContent="space-between" 
              alignItems={{ xs: 'flex-start', md: 'center' }} 
              sx={{ mb: 4 }}
              spacing={2}
            >
              <Typography variant="h3" sx={{ color: '#FFF', fontWeight: 900, letterSpacing: '-1px' }}>
                THE <span style={{ color: BRAND.gold }}>ARCHIVE</span>
              </Typography>
              
              <TextField 
                variant="standard"
                placeholder="Search articles..."
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: BRAND.gold, fontSize: '1.2rem' }} /></InputAdornment>,
                  style: { color: '#FFF', fontSize: '1rem' }
                }}
                sx={{ 
                    width: { xs: '100%', md: '250px' }, 
                    '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.1)' },
                    '& .MuiInput-underline:hover:before': { borderBottomColor: BRAND.gold + ' !important' }
                }}
              />
            </Stack>

            <Slider ref={sliderRef} {...sliderSettings}>
              {filteredPosts.map((post) => (
                <Box key={post.PostID} sx={{ px: 1.5, pb: 4 }}>
                  <EnhancedGlassCard>
                    <Box sx={{ height: 240, overflow: 'hidden' }}>
                        <motion.img 
                            src={post.CoverImage} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                        />
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Stack direction="row" spacing={2} sx={{ mb: 1.5 }}>
                        <Typography variant="caption" sx={{ color: BRAND.gold, fontWeight: 700 }}>
                            {new Date(post.DatePosted).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" sx={{ color: BRAND.textMuted }}>• 5 MIN READ</Typography>
                      </Stack>
                      <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 800, mb: 1.5, lineHeight: 1.3, height: '55px', overflow: 'hidden' }}>
                        {post.Title}
                      </Typography>
                      <Typography sx={{ color: BRAND.textMuted, fontSize: '0.9rem', mb: 2, height: '60px', overflow: 'hidden' }}>
                        {post.Content.substring(0, 100)}...
                      </Typography>
                      <Button sx={{ color: BRAND.gold, p: 0, fontWeight: 900, fontSize: '0.8rem' }}>READ MORE —</Button>
                    </CardContent>
                  </EnhancedGlassCard>
                </Box>
              ))}
            </Slider>

            {/* Pagination Controls */}
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <IconButton onClick={() => sliderRef.current.slickPrev()} sx={{ border: '1px solid rgba(255,255,255,0.1)', color: BRAND.gold }}>
                    <LeftIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => sliderRef.current.slickNext()} sx={{ border: '1px solid rgba(255,255,255,0.1)', color: BRAND.gold }}>
                    <RightIcon fontSize="small" />
                </IconButton>
            </Stack>
          </Grid>

          {/* RIGHT: ICYMI Sidebar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 20 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4 }}>
                    <HotIcon sx={{ color: BRAND.gold, fontSize: '1.2rem' }} />
                    <Typography variant="h6" sx={{ fontWeight: 900, color: '#FFF', letterSpacing: '1px' }}>ICYMI</Typography>
                </Stack>
                
                <Stack spacing={3}>
                    {icymiPosts.map((post, i) => (
                        <motion.div key={i} whileHover={{ x: 5 }} style={{ cursor: 'pointer' }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={3}>
                                    <Box sx={{ height: 65, borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <img src={post.CoverImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                                    </Box>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body2" sx={{ color: '#FFF', fontWeight: 700, lineHeight: 1.2, mb: 0.5, fontSize: '0.85rem' }}>
                                        {post.Title}
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <TimeIcon sx={{ fontSize: '0.7rem', color: BRAND.gold }} />
                                        <Typography variant="caption" sx={{ color: BRAND.textMuted, fontSize: '0.7rem' }}>
                                            {new Date(post.DatePosted).toLocaleDateString()}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </motion.div>
                    ))}
                </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default News;