import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import AOS from 'aos';

// Material UI
import {
  Box, Typography, Container, Grid, Card, CardActions, 
  CardContent, CardMedia, IconButton, Stack, CircularProgress, 
  Button, TextField, InputAdornment, Collapse
} from '@mui/material';

// Icons
import { 
  Whatshot as HotIcon, 
  ChevronLeft as LeftIcon, 
  ChevronRight as RightIcon,
  FilterList as FilterIcon,
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowUp as ExpandLessIcon
} from '@mui/icons-material';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F", 
  white: "#FFFFFF",
  textMuted: "#666666",
};

const NewsCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card sx={{ 
      bgcolor: BRAND.white, 
      borderRadius: '12px', 
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <CardMedia
        component="img"
        alt={post.Title}
        height="160" // Reduced image height to make card smaller
        image={post.CoverImage}
      />
      <CardContent sx={{ p: 2, flexGrow: 1 }}>
        <Typography variant="caption" sx={{ color: BRAND.gold, fontWeight: 700 }}>
          {new Date(post.DatePosted).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#333', fontWeight: 800, mt: 0.5, lineHeight: 1.2 }}>
          {post.Title}
        </Typography>
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body2" sx={{ color: BRAND.textMuted, mt: 1.5, fontSize: '0.8rem' }}>
            {post.Content.replace(/<[^>]*>/g, '')}
          </Typography>
        </Collapse>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button 
          size="small" 
          onClick={() => setExpanded(!expanded)}
          sx={{ color: BRAND.gold, fontWeight: 800, fontSize: '0.7rem', p: 0 }}
        >
          {expanded ? "READ LESS —" : "READ STORY —"}
        </Button>
      </CardActions>
    </Card>
  );
};

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const sliderRef = useRef(null);

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

  const icymiPosts = posts.slice(0, 4); 

  const sliderSettings = {
    dots: false,
    infinite: filteredPosts.length > 2,
    speed: 500,
    slidesToShow: 2, // Shows 2 cards side-by-side
    slidesToScroll: 1,
    arrows: false,
  };

  if (loading) return <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "#f5f5f5" }}><CircularProgress /></Box>;

  return (
    <Box sx={{ minHeight: "100vh", py: 8, bgcolor: "#f9f9f9" }}>
      <Container maxWidth="lg">
        
        {/* Header Area */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#1a1a1a' }}>
            THE <span style={{ color: BRAND.gold }}>NEWSROOM</span>
          </Typography>
          <TextField 
            size="small"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: '250px', bgcolor: '#fff' }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><FilterIcon fontSize="small" /></InputAdornment>,
            }}
          />
        </Stack>

        <Grid container spacing={3}>
          {/* LEFT CONTAINER (THE BIG BOX FOR NEWS) */}
          <Grid item xs={12} md={8}>
            <Box sx={{ 
              bgcolor: '#fff', 
              p: 3, 
              borderRadius: '20px', 
              border: '1px solid #eee',
              minHeight: '400px'
            }}>
              <Slider ref={sliderRef} {...sliderSettings}>
                {filteredPosts.map((post) => (
                  <Box key={post.PostID} sx={{ px: 1 }}>
                    <NewsCard post={post} />
                  </Box>
                ))}
              </Slider>
              
              <Stack direction="row" spacing={1} sx={{ mt: 3, justifyContent: 'center' }}>
                <IconButton onClick={() => sliderRef.current.slickPrev()} sx={{ bgcolor: BRAND.gold, color: '#fff', '&:hover': { bgcolor: '#d48a12' } }}><LeftIcon /></IconButton>
                <IconButton onClick={() => sliderRef.current.slickNext()} sx={{ bgcolor: BRAND.gold, color: '#fff', '&:hover': { bgcolor: '#d48a12' } }}><RightIcon /></IconButton>
              </Stack>
            </Box>
          </Grid>

          {/* RIGHT CONTAINER (THE SIDEBAR BOX) */}
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              bgcolor: '#02150F', // Dark theme for sidebar as per your image
              p: 3, 
              borderRadius: '20px',
              color: '#fff',
              height: 'fit-content'
            }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                <HotIcon sx={{ color: BRAND.gold }} />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>ICYMI</Typography>
              </Stack>

              <Stack spacing={2}>
                {icymiPosts.map((post, i) => (
                  <Stack key={i} direction="row" spacing={2} alignItems="center" sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)', pb: 2 }}>
                    <Box sx={{ width: 60, height: 60, borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={post.CoverImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{post.Title}</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>12/01/2026</Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>

              <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(236, 155, 20, 0.1)', borderRadius: '12px', border: '1px solid rgba(236, 155, 20, 0.3)' }}>
                <Typography variant="subtitle2" sx={{ color: BRAND.gold, fontWeight: 800 }}>Secure Updates</Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>Official financial insights from the SACCO.</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default News;