import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Slider from 'react-slick';

// Material UI
import {
  Box, Typography, Container, Grid, CardContent, IconButton,
  Stack, CircularProgress, Button, TextField, InputAdornment,
  Collapse, useTheme, useMediaQuery
} from '@mui/material';

// Icons
import {
  Whatshot as HotIcon,
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
  FilterList as FilterIcon,
  KeyboardArrowDown as ExpandIcon,
  KeyboardArrowUp as CloseIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F", 
  cardBg: "#051B14",
  textMuted: "rgba(244, 244, 244, 0.7)",
};

// The Individual News Card Style
const NewsCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ 
      bgcolor: BRAND.cardBg, 
      borderRadius: '20px', 
      border: `1px solid ${expanded ? BRAND.gold : 'rgba(255,255,255,0.05)'}`,
      overflow: 'hidden',
      height: '100%',
      transition: '0.3s'
    }}>
      <Box sx={{ height: 180, overflow: 'hidden' }}>
        <img src={post.CoverImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
      </Box>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="caption" sx={{ color: BRAND.gold, fontWeight: 700 }}>
          {new Date(post.DatePosted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </Typography>
        <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 800, mt: 0.5, mb: 1, lineHeight: 1.2 }}>
          {post.Title}
        </Typography>
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography sx={{ color: BRAND.textMuted, fontSize: '0.85rem', mb: 2 }}>
            {post.Content.replace(/<[^>]*>/g, '')}
          </Typography>
        </Collapse>

        <Button
          onClick={() => setExpanded(!expanded)}
          endIcon={expanded ? <CloseIcon /> : <ExpandIcon />}
          sx={{ color: BRAND.gold, p: 0, fontWeight: 900, fontSize: '0.75rem' }}
        >
          READ FULL STORY
        </Button>
      </CardContent>
    </Box>
  );
};

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const sliderRef = useRef(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/posts')
      .then(res => {
        const sorted = (res.data.posts || []).sort((a, b) => new Date(b.DatePosted) - new Date(a.DatePosted));
        setPosts(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(p => p.Title?.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, posts]);

  const sliderSettings = {
    dots: false,
    infinite: filteredPosts.length > 2,
    speed: 500,
    slidesToShow: isDesktop ? 2 : 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (loading) return <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: BRAND.dark }}><CircularProgress sx={{ color: BRAND.gold }} /></Box>;

  return (
    <Box sx={{ minHeight: "100vh", py: 6, bgcolor: BRAND.dark, color: '#FFF' }}>
      <Container maxWidth="xl">
        
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 900 }}>
            THE <span style={{ color: BRAND.gold }}>NEWSROOM</span>
          </Typography>
          <TextField
            size="small"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mt: 2, maxWidth: '400px', width: '100%', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><FilterIcon sx={{ color: BRAND.gold }} /></InputAdornment>,
              sx: { color: '#FFF' }
            }}
          />
        </Box>

        {/* SIDE BY SIDE LAYOUT */}
        <Grid container spacing={3} alignItems="flex-start">
          
          {/* LEFT BOX: News Cards Slider */}
          <Grid item xs={12} md={8}>
            <Box sx={{ 
              bgcolor: 'rgba(255,255,255,0.02)', 
              p: { xs: 2, md: 4 }, 
              borderRadius: '24px', 
              border: '1px solid rgba(255,255,255,0.05)' 
            }}>
              <Slider ref={sliderRef} {...sliderSettings}>
                {filteredPosts.map((post) => (
                  <Box key={post.PostID} sx={{ px: 1 }}>
                    <NewsCard post={post} />
                  </Box>
                ))}
              </Slider>
              
              <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
                <IconButton onClick={() => sliderRef.current.slickPrev()} sx={{ border: '1px solid rgba(255,255,255,0.1)', color: BRAND.gold }}><LeftIcon /></IconButton>
                <IconButton onClick={() => sliderRef.current.slickNext()} sx={{ border: '1px solid rgba(255,255,255,0.1)', color: BRAND.gold }}><RightIcon /></IconButton>
              </Stack>
            </Box>
          </Grid>

          {/* RIGHT BOX: ICYMI Sidebar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              bgcolor: 'rgba(255,255,255,0.03)', 
              p: 3, 
              borderRadius: '24px', 
              border: '1px solid rgba(255,255,255,0.08)' 
            }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
                <HotIcon sx={{ color: BRAND.gold }} />
                <Typography variant="h5" sx={{ fontWeight: 900 }}>ICYMI</Typography>
              </Stack>

              <Stack spacing={3}>
                {posts.slice(0, 4).map((post, i) => (
                  <Stack key={i} direction="row" spacing={2} alignItems="center">
                    <Box sx={{ width: 60, height: 60, borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={post.CoverImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1.2 }}>{post.Title}</Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <TimeIcon sx={{ fontSize: '0.8rem', color: BRAND.gold }} />
                        <Typography variant="caption" sx={{ color: BRAND.textMuted }}>1/12/2026</Typography>
                      </Stack>
                    </Box>
                  </Stack>
                ))}
              </Stack>

              <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(236, 155, 20, 0.05)', borderRadius: '15px', border: '1px solid rgba(236, 155, 20, 0.2)' }}>
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