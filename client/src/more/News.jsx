import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import AOS from 'aos';

// Material UI
import {
  Box, Typography, Container, Grid, CardContent, IconButton,
  Stack, CircularProgress, Button, TextField, InputAdornment,
  Collapse, useTheme, useMediaQuery
} from '@mui/material';

// Icons
import {
  Whatshot as HotIcon,
  AccessTime as TimeIcon,
  AutoAwesome as SparkleIcon,
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
  FilterList as FilterIcon,
  KeyboardArrowDown as ExpandIcon,
  KeyboardArrowUp as CloseIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F", 
  glass: "rgba(255, 255, 255, 0.03)",
  textMuted: "rgba(244, 244, 244, 0.7)",
};

const EnhancedGlassCard = styled(motion.div)({
  background: BRAND.glass,
  backdropFilter: "blur(15px)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  overflow: "hidden",
  height: '100%',
  transition: "all 0.4s ease-in-out",
  "&:hover": {
    border: `1px solid ${BRAND.gold}`,
  }
});

const SingleNewsCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <EnhancedGlassCard>
      {/* Image Area - Higher ratio as requested */}
      <Box sx={{ height: 180, overflow: 'hidden' }}>
        <img 
          src={post.CoverImage} 
          alt={post.Title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </Box>

      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="caption" sx={{ color: BRAND.gold, fontWeight: 700, fontSize: '0.7rem' }}>
          {new Date(post.DatePosted).toLocaleDateString(undefined, { dateStyle: 'medium' })}
        </Typography>
        
        <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 800, mt: 0.5, mb: 1, lineHeight: 1.2, fontSize: '1rem' }}>
          {post.Title}
        </Typography>

        {/* Hidden Content revealed only on click */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography sx={{ color: BRAND.textMuted, fontSize: '0.85rem', mt: 1, mb: 2 }}>
            {post.Content.replace(/<[^>]*>/g, '')}
          </Typography>
        </Collapse>

        <Button
          onClick={() => setExpanded(!expanded)}
          endIcon={expanded ? <CloseIcon /> : <ExpandIcon />}
          sx={{
            color: BRAND.gold,
            p: 0,
            mt: 1,
            fontWeight: 800,
            fontSize: '0.75rem',
            '&:hover': { background: 'transparent', letterSpacing: '0.5px' }
          }}
        >
          {expanded ? "SHOW LESS" : "READ FULL STORY"}
        </Button>
      </CardContent>
    </EnhancedGlassCard>
  );
};

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const sliderRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  const icymiPosts = posts.slice(0, 5);

  const sliderSettings = {
    dots: false,
    infinite: filteredPosts.length > (isMobile ? 1 : 2),
    speed: 800,
    slidesToShow: isMobile ? 1 : 2, // Exactly 2 cards per view
    slidesToScroll: 1,
    autoplay: false,
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
        <Stack spacing={1} sx={{ mb: 6, textAlign: 'left' }}>
          <Typography variant="h3" sx={{ color: "#FFF", fontWeight: 900 }}>
            THE <span style={{ color: BRAND.gold }}>NEWSROOM</span>
          </Typography>
          <TextField
            size="small"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ maxWidth: '400px' }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><FilterIcon sx={{ color: BRAND.gold }} /></InputAdornment>,
              sx: { color: '#FFF', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '10px' }
            }}
          />
        </Stack>

        <Grid container spacing={4}>
          {/* LEFT: News Feed Container */}
          <Grid item xs={12} md={8.5}>
            <Box sx={{ 
              bgcolor: 'rgba(255,255,255,0.02)', 
              p: 3, 
              borderRadius: '24px', 
              border: '1px solid rgba(255,255,255,0.05)' 
            }}>
              <Slider ref={sliderRef} {...sliderSettings}>
                {filteredPosts.map((post) => (
                  <Box key={post.PostID} sx={{ px: 1 }}>
                    <SingleNewsCard post={post} />
                  </Box>
                ))}
              </Slider>
              
              <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
                <IconButton onClick={() => sliderRef.current.slickPrev()} sx={{ border: '1px solid rgba(255,255,255,0.1)', color: BRAND.gold }}><LeftIcon /></IconButton>
                <IconButton onClick={() => sliderRef.current.slickNext()} sx={{ border: '1px solid rgba(255,255,255,0.1)', color: BRAND.gold }}><RightIcon /></IconButton>
              </Stack>
            </Box>
          </Grid>

          {/* RIGHT: ICYMI Sidebar Container */}
          <Grid item xs={12} md={3.5}>
            <Box sx={{ 
              bgcolor: 'rgba(255,255,255,0.03)', 
              p: 3, 
              borderRadius: '24px', 
              border: '1px solid rgba(255,255,255,0.08)',
              height: 'fit-content',
              position: 'sticky',
              top: 20
            }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 4 }}>
                <HotIcon sx={{ color: BRAND.gold }} />
                <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 900 }}>ICYMI</Typography>
              </Stack>

              <Stack spacing={3}>
                {icymiPosts.map((post, i) => (
                  <Stack key={i} direction="row" spacing={2} alignItems="center">
                    <Box sx={{ width: 60, height: 60, borderRadius: '12px', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
                      <img src={post.CoverImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#FFF', fontWeight: 700, lineHeight: 1.2 }}>{post.Title}</Typography>
                      <Typography variant="caption" sx={{ color: BRAND.textMuted }}>{new Date(post.DatePosted).toLocaleDateString()}</Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>

              <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(236, 155, 20, 0.05)', borderRadius: '15px', border: '1px solid rgba(236, 155, 20, 0.1)' }}>
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