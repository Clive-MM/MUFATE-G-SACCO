import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import AOS from 'aos';

// Material UI
import {
  Box, Typography, Container, Grid, Card, CardActions, 
  CardContent, CardMedia, IconButton, Stack, CircularProgress, 
  Button, TextField, InputAdornment, useTheme, useMediaQuery, Collapse
} from '@mui/material';

// Icons
import { 
  Whatshot as HotIcon, 
  SparkleIcon, // Assuming custom or mapped from AutoAwesome
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
  cardBg: "#051B14", 
  textMuted: "rgba(244, 244, 244, 0.6)",
};

const NewsCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card sx={{ 
        bgcolor: BRAND.cardBg, 
        borderRadius: '16px', 
        border: '1px solid rgba(255,255,255,0.07)',
        height: '100%',
        '&:hover': { borderColor: BRAND.gold }
      }}>
        <CardMedia
          component="img"
          alt={post.Title}
          height="220" // Increased image height relative to text
          image={post.CoverImage}
        />
        <CardContent sx={{ pb: 1 }}>
          <Typography variant="caption" sx={{ color: BRAND.gold, fontWeight: 800, fontSize: '0.65rem' }}>
            {new Date(post.DatePosted).toLocaleDateString(undefined, { dateStyle: 'medium'})}
          </Typography>
          <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 800, mt: 0.5, fontSize: '1rem', lineHeight: 1.2 }}>
            {post.Title}
          </Typography>
          
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography variant="body2" sx={{ color: BRAND.textMuted, mt: 2, fontSize: '0.85rem' }}>
              {post.Content.replace(/<[^>]*>/g, '')}
            </Typography>
          </Collapse>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button 
            size="small" 
            onClick={() => setExpanded(!expanded)}
            endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{ color: BRAND.gold, fontWeight: 900, fontSize: '0.75rem' }}
          >
            {expanded ? "SHOW LESS" : "READ STORY"}
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const sliderRef = useRef(null);
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const icymiPosts = posts.slice(0, 5); 

  const sliderSettings = {
    dots: false,
    infinite: filteredPosts.length > 2,
    speed: 600,
    slidesToShow: isMobile ? 1 : 2, // 2 cards per container as requested
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
    <Box sx={{ minHeight: "100vh", py: 6, bgcolor: BRAND.dark }}>
      <Container maxWidth="xl">
        
        {/* Header Section */}
        <Box sx={{ mb: 6, textAlign: 'left' }}>
          <Typography variant="h3" sx={{ color: "#FFF", fontWeight: 900, mb: 2 }}>
            THE <span style={{ color: BRAND.gold }}>NEWSROOM</span>
          </Typography>
          <TextField 
            size="small"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ maxWidth: '400px', width: '100%' }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><FilterIcon sx={{ color: BRAND.gold }} /></InputAdornment>,
              sx: { color: '#FFF', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {/* LEFT SIDE: MAIN SLIDER (Reduced card width via Grid size) */}
          <Grid item xs={12} md={8.5}> 
            <Box sx={{ position: 'relative' }}>
              <Slider ref={sliderRef} {...sliderSettings}>
                {filteredPosts.map((post) => (
                  <Box key={post.PostID} sx={{ px: 1 }}>
                    <NewsCard post={post} />
                  </Box>
                ))}
              </Slider>
              
              <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                <IconButton onClick={() => sliderRef.current.slickPrev()} sx={{ border: '1px solid rgba(255,255,255,0.1)', color: BRAND.gold }}><LeftIcon /></IconButton>
                <IconButton onClick={() => sliderRef.current.slickNext()} sx={{ border: '1px solid rgba(255,255,255,0.1)', color: BRAND.gold }}><RightIcon /></IconButton>
              </Stack>
            </Box>
          </Grid>

          {/* RIGHT SIDEBAR: ICYMI */}
          <Grid item xs={12} md={3.5}>
            <Box sx={{ 
              bgcolor: BRAND.cardBg, 
              p: 3, 
              borderRadius: '20px', 
              border: '1px solid rgba(255,255,255,0.05)',
              position: 'sticky',
              top: 20
            }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                <HotIcon sx={{ color: BRAND.gold }} />
                <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 900 }}>ICYMI</Typography>
              </Stack>

              <Stack spacing={2.5}>
                {icymiPosts.map((post, i) => (
                  <Stack key={i} direction="row" spacing={2} alignItems="center" component={motion.div} whileHover={{ x: 5 }} sx={{ cursor: 'pointer' }}>
                    <Box sx={{ width: 65, height: 60, borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={post.CoverImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#FFF', fontWeight: 700, lineHeight: 1.2 }}>
                        {post.Title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: BRAND.textMuted }}>
                        {new Date(post.DatePosted).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>

              <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(236, 155, 20, 0.08)', borderRadius: '12px', border: '1px solid rgba(236, 155, 20, 0.2)' }}>
                <Typography variant="subtitle2" sx={{ color: BRAND.gold, fontWeight: 900 }}>Secure Updates</Typography>
                <Typography variant="caption" sx={{ color: BRAND.textMuted }}>Financial insights from the Golden Generation DT SACCO.</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default News;