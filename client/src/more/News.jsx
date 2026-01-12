import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import AOS from 'aos';

// Material UI
import {
  Box, Typography, Container, Grid, Card, CardActions, 
  CardContent, CardMedia, IconButton, Stack, CircularProgress, 
  Button, TextField, InputAdornment, useTheme, useMediaQuery
} from '@mui/material';

// Icons
import { 
  Whatshot as HotIcon, 
  AccessTime as TimeIcon,
  AutoAwesome as SparkleIcon,
  ChevronLeft as LeftIcon, 
  ChevronRight as RightIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';

// Slick Slider CSS
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F", 
  cardBg: "#051B14", 
  textMuted: "rgba(244, 244, 244, 0.6)",
};

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const sliderRef = useRef(null);
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/posts')
      .then(res => {
        const sorted = (res.data.posts || []).sort((a, b) => new Date(b.DatePosted) - new Date(a.DatePosted));
        setPosts(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    AOS.init({ duration: 1000, once: true });
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(p => p.Title?.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, posts]);

  const icymiPosts = posts.slice(0, 4); 

  const sliderSettings = {
    dots: false,
    infinite: filteredPosts.length > 3,
    speed: 800,
    slidesToShow: isMobile ? 1 : (isTablet ? 2 : 3), 
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  if (loading) return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: BRAND.dark }}>
      <CircularProgress sx={{ color: BRAND.gold }} />
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", py: 8, bgcolor: BRAND.dark }}>
      <Container maxWidth="xl">
        
        {/* Header Section */}
        <Stack spacing={1} sx={{ mb: 6, textAlign: "center", alignItems: "center" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <SparkleIcon sx={{ color: BRAND.gold, fontSize: "0.9rem" }} />
            <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 800, letterSpacing: 3 }}>
              MEMBER UPDATES
            </Typography>
          </Stack>
          <Typography variant="h4" sx={{ color: "#FFF", fontWeight: 900, textTransform: "uppercase", mb: 2 }}>
            THE <span style={{ color: BRAND.gold }}>NEWSROOM</span>
          </Typography>
          
          <TextField 
            size="small"
            sx={{ maxWidth: '450px', width: '100%' }}
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><FilterIcon sx={{ color: BRAND.gold, fontSize: '1.2rem' }} /></InputAdornment>,
              sx: { color: '#FFF', bgcolor: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }
            }}
          />
        </Stack>

        <Grid container spacing={4}>
          <Grid item xs={12} md={9}>
            <Box sx={{ position: 'relative' }}>
              <Slider ref={sliderRef} {...sliderSettings}>
                {filteredPosts.map((post) => (
                  <Box key={post.PostID} sx={{ px: 1.5, py: 2 }}>
                    <motion.div
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card sx={{ 
                        bgcolor: BRAND.cardBg, 
                        borderRadius: '20px', 
                        border: '1px solid rgba(255,255,255,0.07)',
                        height: '100%',
                        transition: 'border 0.3s ease',
                        '&:hover': { borderColor: BRAND.gold }
                      }}>
                        <CardMedia
                          component="img"
                          alt={post.Title}
                          height="180" 
                          image={post.CoverImage}
                          sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                        />
                        <CardContent>
                          <Typography variant="caption" sx={{ color: BRAND.gold, fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem' }}>
                            {new Date(post.DatePosted).toLocaleDateString(undefined, { dateStyle: 'medium'})}
                          </Typography>
                          <Typography gutterBottom variant="h6" sx={{ color: '#FFF', fontWeight: 800, mt: 1, height: '50px', overflow: 'hidden', lineHeight: 1.2 }}>
                            {post.Title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: BRAND.textMuted, height: '60px', overflow: 'hidden' }}>
                            {post.Content.replace(/<[^>]*>/g, '').substring(0, 90)}...
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ px: 2, pb: 3 }}>
                          <Button size="small" sx={{ color: BRAND.gold, fontWeight: 900, '&:hover': { background: 'transparent', letterSpacing: '1px' }, transition: '0.2s' }}>
                            READ STORY —
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Box>
                ))}
              </Slider>
              
              {/* Slider Controls */}
              <Stack direction="row" spacing={1.5} sx={{ mt: 2, px: 1.5 }}>
                <IconButton onClick={() => sliderRef.current.slickPrev()} sx={{ border: '1px solid rgba(255,255,255,0.1)', color: BRAND.gold }}><LeftIcon /></IconButton>
                <IconButton onClick={() => sliderRef.current.slickNext()} sx={{ border: '1px solid rgba(255,255,255,0.1)', color: BRAND.gold }}><RightIcon /></IconButton>
              </Stack>
            </Box>
          </Grid>

          {/* Sidebar ICYMI */}
          <Grid item xs={12} md={3}>
            <Box sx={{ bgcolor: BRAND.cardBg, p: 3, borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4 }}>
                <HotIcon sx={{ color: BRAND.gold }} />
                <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 900, letterSpacing: 1 }}>ICYMI</Typography>
              </Stack>

              <Stack spacing={3.5}>
                {icymiPosts.map((post, i) => (
                  <Stack key={i} direction="row" spacing={2} alignItems="center" component={motion.div} whileHover={{ x: 5 }} sx={{ cursor: 'pointer' }}>
                    <Box sx={{ width: 70, height: 60, borderRadius: '12px', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
                      <img src={post.CoverImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: '#FFF', fontWeight: 800, lineHeight: 1.2, mb: 0.5 }}>
                        {post.Title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: BRAND.textMuted }}>
                        {new Date(post.DatePosted).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>

              <Box sx={{ mt: 5, p: 2, bgcolor: 'rgba(236, 155, 20, 0.05)', borderRadius: '15px', border: '1px solid rgba(236, 155, 20, 0.1)' }}>
                <Typography variant="subtitle2" sx={{ color: BRAND.gold, fontWeight: 900 }}>Secure Updates</Typography>
                <Typography variant="caption" sx={{ color: BRAND.textMuted }}>Official insights from Golden Generation DT SACCO.</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default News;