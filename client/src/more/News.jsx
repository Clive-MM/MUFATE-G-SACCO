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
  dark: "#02150F", // Dark background from image
  cardBg: "#051B14", // Slightly lighter green-black for depth
  textMuted: "rgba(244, 244, 244, 0.6)",
};

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const sliderRef = useRef(null);
  const theme = useTheme();
  
  // Adjusted: 3 cards on desktop, 1 on mobile
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
    slidesToShow: isMobile ? 1 : (isTablet ? 2 : 3), // Reduced size: 3 cards per row
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
        <Stack spacing={2} sx={{ mb: 6, textAlign: "center", alignItems: "center" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <SparkleIcon sx={{ color: BRAND.gold, fontSize: "1rem" }} />
            <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 800, letterSpacing: 3 }}>
              MEMBER UPDATES
            </Typography>
          </Stack>
          <Typography variant="h3" sx={{ color: "#FFF", fontWeight: 900, textTransform: "uppercase" }}>
            LATEST <span style={{ color: BRAND.gold }}>NEWS</span>
          </Typography>
          
          <TextField 
            size="small"
            sx={{ maxWidth: '400px', width: '100%', mt: 2 }}
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><FilterIcon sx={{ color: BRAND.gold }} /></InputAdornment>,
              sx: { color: '#FFF', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }
            }}
          />
        </Stack>

        <Grid container spacing={4}>
          {/* Main Content Area */}
          <Grid item xs={12} md={9}>
            <Box sx={{ position: 'relative' }}>
              <Slider ref={sliderRef} {...sliderSettings}>
                {filteredPosts.map((post) => (
                  <Box key={post.PostID} sx={{ px: 1 }}>
                    <Card sx={{ 
                      bgcolor: BRAND.cardBg, 
                      borderRadius: '16px', 
                      border: '1px solid rgba(255,255,255,0.05)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <CardMedia
                        component="img"
                        alt={post.Title}
                        height="160" // Reduced height for more compact look
                        image={post.CoverImage}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="caption" sx={{ color: BRAND.gold, fontWeight: 700, display: 'block', mb: 1 }}>
                          {new Date(post.DatePosted).toLocaleDateString()}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" sx={{ color: '#FFF', fontWeight: 800, lineHeight: 1.2, fontSize: '1.1rem' }}>
                          {post.Title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: BRAND.textMuted, lineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {post.Content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ px: 2, pb: 2 }}>
                        <Button size="small" sx={{ color: BRAND.gold, fontWeight: 800 }}>READ MORE</Button>
                      </CardActions>
                    </Card>
                  </Box>
                ))}
              </Slider>
              
              {/* Custom Navigation */}
              <Stack direction="row" spacing={1} sx={{ mt: 3, px: 1 }}>
                <IconButton onClick={() => sliderRef.current.slickPrev()} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: BRAND.gold }}><LeftIcon /></IconButton>
                <IconButton onClick={() => sliderRef.current.slickNext()} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: BRAND.gold }}><RightIcon /></IconButton>
              </Stack>
            </Box>
          </Grid>

          {/* Sidebar - ICYMI Section */}
          <Grid item xs={12} md={3}>
            <Box sx={{ bgcolor: BRAND.cardBg, p: 3, borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                <HotIcon sx={{ color: BRAND.gold, fontSize: '1.2rem' }} />
                <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 900 }}>ICYMI</Typography>
              </Stack>

              <Stack spacing={3}>
                {icymiPosts.map((post, i) => (
                  <Stack key={i} direction="row" spacing={2} alignItems="center">
                    <Box sx={{ width: 60, height: 60, borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={post.CoverImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#FFF', fontWeight: 700, lineHeight: 1.1, display: 'block', mb: 0.5 }}>
                        {post.Title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: BRAND.textMuted, fontSize: '0.7rem' }}>
                        {new Date(post.DatePosted).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>

              <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(236, 155, 20, 0.08)', borderRadius: '12px', border: '1px solid rgba(236, 155, 20, 0.2)' }}>
                <Typography variant="caption" sx={{ color: BRAND.gold, fontWeight: 900, display: 'block' }}>Secure Updates</Typography>
                <Typography variant="caption" sx={{ color: BRAND.textMuted, fontSize: '0.75rem' }}>Insights from Golden Generation DT SACCO.</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default News;