import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
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
  KeyboardArrowUp as CloseIcon
} from '@mui/icons-material';

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  cardBg: "#051B14",
  textMuted: "rgba(244, 244, 244, 0.7)",
};

const NewsCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      sx={{
        bgcolor: BRAND.cardBg,
        borderRadius: '16px',
        border: `1px solid rgba(255,255,255,0.08)`,
        overflow: 'hidden',
        transition: '0.3s',
        maxWidth: '340px',
        margin: '0 auto',
        '&:hover': { transform: 'translateY(-4px)', borderColor: BRAND.gold }
      }}
    >
      <Box sx={{ height: 160, overflow: 'hidden' }}>
        <img src={post.CoverImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Typography variant="caption" sx={{ color: BRAND.gold, fontWeight: 700, fontSize: '0.7rem' }}>
          {new Date(post.DatePosted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </Typography>

        <Typography variant="subtitle1" sx={{ color: '#FFF', fontWeight: 800, mt: 0.5, lineHeight: 1.2, fontSize: '0.95rem' }}>
          {post.Title}
        </Typography>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography sx={{ color: BRAND.textMuted, fontSize: '0.8rem', mt: 1 }}>
            {post.Content.replace(/<[^>]*>/g, '').substring(0, 100)}...
          </Typography>
        </Collapse>

        <Button
          onClick={() => setExpanded(!expanded)}
          endIcon={expanded ? <CloseIcon sx={{ fontSize: 12 }} /> : <ExpandIcon sx={{ fontSize: 12 }} />}
          sx={{ color: BRAND.gold, p: 0, mt: 1, fontWeight: 900, fontSize: '0.7rem' }}
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

  const sliderSettings = {
    dots: false,
    infinite: posts.length > 2,
    speed: 500,
    slidesToShow: isDesktop ? 2 : 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (loading) return <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: BRAND.dark }}><CircularProgress sx={{ color: BRAND.gold }} /></Box>;

  return (
    <Box sx={{ minHeight: "100vh", py: 4, bgcolor: BRAND.dark, color: '#FFF' }}>
      <Container maxWidth="xl">

        {/* HEADER Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -1 }}>
            THE <span style={{ color: BRAND.gold }}>NEWSROOM</span>
          </Typography>
          <TextField
            size="small"
            placeholder="Search news..."
            sx={{ mt: 1.5, maxWidth: '300px', width: '100%', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><FilterIcon sx={{ color: BRAND.gold, fontSize: 18 }} /></InputAdornment>,
              sx: { color: '#FFF', fontSize: '0.85rem' }
            }}
          />
        </Box>

        {/* APPLYING YOUR REQUESTED GRID STRUCTURE */}
        <Grid container spacing={2}>
          
          {/* LEFT COLUMN: size={4} (1/3 width) */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Box sx={{
                bgcolor: 'rgba(255,255,255,0.03)',
                p: 2.5,
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.08)',
                position: 'sticky',
                top: 20
              }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                  <HotIcon sx={{ color: BRAND.gold, fontSize: 20 }} />
                  <Typography sx={{ fontWeight: 900, fontSize: '1.1rem' }}>ICYMI</Typography>
                </Stack>

                <Stack spacing={2.5}>
                  {posts.slice(0, 5).map((post, i) => (
                    <Stack key={i} direction="row" spacing={1.5} alignItems="center">
                      <Box sx={{ width: 50, height: 50, borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={post.CoverImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, lineHeight: 1.1, display: 'block', color: '#FFF', fontSize: '0.75rem' }}>
                          {post.Title.substring(0, 35)}...
                        </Typography>
                        <Typography variant="caption" sx={{ color: BRAND.textMuted, fontSize: '0.65rem' }}>
                          {new Date(post.DatePosted).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {/* RIGHT COLUMN: size={8} (2/3 width) */}
          <Grid item xs={12} md={8}>
            <Box sx={{
              bgcolor: 'rgba(255,255,255,0.015)',
              p: { xs: 2, md: 3 },
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.04)',
              height: '100%', // Matching your height request
              boxSizing: 'border-box' // Matching your box-sizing request
            }}>
              <Slider ref={sliderRef} {...sliderSettings}>
                {posts.map((post) => (
                  <Box key={post.PostID} sx={{ px: 1 }}>
                    <NewsCard post={post} />
                  </Box>
                ))}
              </Slider>

              <Stack direction="row" spacing={1.5} sx={{ mt: 3, justifyContent: 'center' }}>
                <IconButton onClick={() => sliderRef.current.slickPrev()} sx={{ border: '1px solid rgba(255,255,255,0.05)', color: BRAND.gold, width: 35, height: 35 }}><LeftIcon fontSize="small" /></IconButton>
                <IconButton onClick={() => sliderRef.current.slickNext()} sx={{ border: '1px solid rgba(255,255,255,0.05)', color: BRAND.gold, width: 35, height: 35 }}><RightIcon fontSize="small" /></IconButton>
              </Stack>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default News;