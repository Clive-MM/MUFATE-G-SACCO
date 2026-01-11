import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Container, Grid, CardContent, IconButton, 
  Stack, CircularProgress, Button, TextField, InputAdornment, 
  Chip, Divider, useTheme, useMediaQuery, Paper
} from '@mui/material';
import { 
  CalendarMonth as CalendarIcon, ChevronLeft as LeftIcon, 
  ChevronRight as RightIcon, ArrowForward as ArrowIcon,
  Search as SearchIcon, Share as ShareIcon,
  Whatshot as HotIcon, WhatsApp as WhatsAppIcon
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
  glass: 'rgba(2, 21, 15, 0.7)'
};

const EnhancedGlassCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(2, 21, 15, 0.6)',
  backdropFilter: 'blur(25px) saturate(180%)',
  borderRadius: '30px',
  border: `1px solid rgba(255, 255, 255, 0.08)`,
  borderTop: `3px solid ${BRAND.gold}`,
  color: BRAND.light,
  overflow: 'hidden',
  height: '100%'
}));

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const sliderRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
  const icymiPosts = posts.slice(1, 4); // Top 3 trending/recent
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
    <Box sx={{ bgcolor: BRAND.dark, minHeight: '100vh', color: BRAND.light }}>
      
      {/* 1. CINEMA-STYLE FEATURED HERO */}
      {featured && (
        <Box sx={{ position: 'relative', height: '85vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <motion.div
            initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            style={{ position: 'absolute', inset: 0, backgroundImage: `url(${featured.CoverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${BRAND.dark} 30%, transparent 100%)` }} />
          
          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Stack spacing={2} sx={{ maxWidth: '700px' }}>
                <Typography sx={{ color: BRAND.gold, fontWeight: 900, letterSpacing: '4px' }}>FEATURED UPDATE</Typography>
                <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4.5rem' }, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1 }}>
                  {featured.Title}
                </Typography>
                <Typography sx={{ opacity: 0.8, fontSize: '1.1rem', mb: 3 }}>{featured.Content.substring(0, 180)}...</Typography>
                <Button variant="contained" sx={{ bgcolor: BRAND.gold, color: BRAND.dark, fontWeight: 900, width: 'fit-content', px: 4, py: 1.5, borderRadius: '10px' }}>
                  READ ARTICLE
                </Button>
              </Stack>
            </motion.div>
          </Container>
        </Box>
      )}

      {/* 2. NEWSLETTER QUICK-JOIN STRIP */}
      <Box sx={{ bgcolor: BRAND.gold, py: 3 }}>
        <Container maxWidth="xl">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="h5" sx={{ color: BRAND.dark, fontWeight: 900 }}>STAY IN THE GOLDEN LOOP</Typography>
              <Typography variant="body2" sx={{ color: BRAND.dark }}>Get instant updates via Email or WhatsApp.</Typography>
            </Grid>
            <Grid item xs={12} md={7}>
              <Stack direction="row" spacing={1}>
                <TextField 
                  fullWidth size="small" placeholder="Enter Email or Phone"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '8px', '& fieldset': { border: 'none' } }}
                />
                <Button variant="contained" startIcon={<WhatsAppIcon />} sx={{ bgcolor: BRAND.dark, color: BRAND.gold, fontWeight: 900, px: 3 }}>JOIN</Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Grid container spacing={6}>
          {/* 3. MAIN CONTENT AREA (Left) */}
          <Grid item xs={12} md={8}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>LATEST <span style={{ color: BRAND.gold }}>FEED</span></Typography>
              
              {/* SEARCH BAR */}
              <TextField 
                variant="standard"
                placeholder="Search news..."
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: BRAND.gold }} /></InputAdornment>,
                  style: { color: '#FFF', borderBottom: `1px solid ${BRAND.gold}` }
                }}
              />
            </Stack>

            <Slider ref={sliderRef} {...sliderSettings}>
              {filteredPosts.map((post) => (
                <Box key={post.PostID} sx={{ px: 2 }}>
                  <EnhancedGlassCard>
                    <Box sx={{ height: 200, backgroundImage: `url(${post.CoverImage})`, backgroundSize: 'cover' }} />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 900, color: BRAND.gold, mb: 1 }}>{post.Title}</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>{post.Content.substring(0, 100)}...</Typography>
                      <Button sx={{ color: BRAND.gold, p: 0 }}>READ MORE</Button>
                    </CardContent>
                  </EnhancedGlassCard>
                </Box>
              ))}
            </Slider>
          </Grid>

          {/* 4. ICYMI SIDEBAR (Right) */}
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                <HotIcon sx={{ color: BRAND.gold }} />
                <Typography variant="h6" sx={{ fontWeight: 900 }}>ICYMI</Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: BRAND.textMuted, display: 'block', mb: 3 }}>In case you missed it - Trending Updates</Typography>
              
              <Stack spacing={3}>
                {icymiPosts.map((post, i) => (
                  <Stack key={i} direction="row" spacing={2} sx={{ cursor: 'pointer', '&:hover img': { transform: 'scale(1.1)' } }}>
                    <Box sx={{ width: 80, height: 80, borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={post.CoverImage} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.4s' }} alt="" />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>{post.Title}</Typography>
                      <Typography variant="caption" sx={{ color: BRAND.gold }}>{new Date(post.DatePosted).toLocaleDateString()}</Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>

              <Button fullWidth sx={{ mt: 4, border: `1px solid ${BRAND.gold}`, color: BRAND.gold, borderRadius: '10px' }}>
                VIEW ALL ARCHIVES
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default News;