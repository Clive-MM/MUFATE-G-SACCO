import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

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
  AutoAwesome as SparkleIcon
} from '@mui/icons-material';

// Slick Slider CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  cardBg: "#051B14",
  textMuted: "rgba(244, 244, 244, 0.7)",
};

// --- NewsCard Component ---
const NewsCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      sx={{
        bgcolor: BRAND.cardBg,
        borderRadius: '20px',
        border: `1px solid rgba(255,255,255,0.08)`,
        overflow: 'hidden',
        transition: '0.3s',
        height: '100%',
        '&:hover': {
          transform: 'translateY(-6px)',
          borderColor: BRAND.gold,
          boxShadow: `0 10px 30px rgba(0,0,0,0.5)`
        }
      }}
    >
      <Box sx={{ height: 180, overflow: 'hidden' }}>
        <img
          src={post.CoverImage}
          alt={post.Title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="caption"
          sx={{ color: BRAND.gold, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}
        >
          {new Date(post.DatePosted).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
          })}
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: '#FFF', fontWeight: 800, mt: 1, mb: 1.5, lineHeight: 1.2 }}
        >
          {post.Title}
        </Typography>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography sx={{ color: BRAND.textMuted, fontSize: '0.85rem', mb: 2 }}>
            {post.Content.replace(/<[^>]*>/g, '').substring(0, 160)}...
          </Typography>
        </Collapse>

        <Button
          onClick={() => setExpanded(!expanded)}
          endIcon={expanded ? <CloseIcon /> : <ExpandIcon />}
          sx={{
            color: BRAND.gold,
            p: 0,
            fontWeight: 900,
            fontSize: '0.75rem',
            '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
          }}
        >
          {expanded ? "HIDE DETAILS" : "READ FULL STORY"}
        </Button>
      </CardContent>
    </Box>
  );
};

// --- Main News Component ---
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
        const sorted = (res.data.posts || []).sort(
          (a, b) => new Date(b.DatePosted) - new Date(a.DatePosted)
        );
        setPosts(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: posts.length > 2,
    speed: 600,
    slidesToShow: isDesktop ? 2 : 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const filteredPosts = posts.filter(post =>
    post.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: BRAND.dark }}>
        <CircularProgress sx={{ color: BRAND.gold }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: BRAND.dark, color: '#FFF', pb: 8 }}>

      {/* Elite Header */}
      <Stack alignItems="center" spacing={2} sx={{ mb: 6, textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <SparkleIcon sx={{ color: BRAND.gold, fontSize: "1.2rem" }} />
            <Typography
              variant="overline"
              sx={{
                color: BRAND.gold,
                fontWeight: 800,
                letterSpacing: 6,
              }}
            >
              NEWS UPDATES
            </Typography>
          </Stack>
        </motion.div>

        <Typography
          variant="h1"
          sx={{
            color: "#FFF",
            fontWeight: 900,
            fontSize: { xs: "1.7rem", md: "3rem" },
            textShadow: "0 10px 20px rgba(0,0,0,0.5)",
          }}
        >
          THE <span style={{ color: BRAND.gold }}>NEWSROOM</span>
        </Typography>

        {/* Polished Glassmorphism Search Bar */}
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ mt: 4, width: "100%" }}
        >
          <TextField
            placeholder="Search milestones, events, or descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              maxWidth: "600px",
              width: "100%",
              backdropFilter: "blur(12px)",
              borderRadius: "15px",
              overflow: "hidden",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterIcon sx={{ color: BRAND.gold, ml: 1 }} />
                </InputAdornment>
              ),
              sx: {
                color: "#FFF",
                bgcolor: "rgba(255, 255, 255, 0.08)",
                "& fieldset": {
                  borderColor: "rgba(236, 155, 20, 0.4)",
                },
                "&:hover fieldset": {
                  borderColor: BRAND.gold,
                },
                "&.Mui-focused fieldset": {
                  borderColor: BRAND.gold,
                  borderWidth: "2px",
                },
              },
            }}
          />
        </Stack>
      </Stack>


      {/* PAGE CONTENT CONTAINER */}
      <Container maxWidth="xl" sx={{ mt: 6 }}>
        <Grid container spacing={4} alignItems="flex-start">

          {/* LEFT COLUMN: ICYMI (Sticky Sidebar as seen in sketch) */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.03)',
                p: 3,
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.08)',
                position: 'sticky',
                top: 180, // Anchored below your sticky newsroom header
                backdropFilter: "blur(10px)",
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 4 }}>
                <HotIcon sx={{ color: BRAND.gold, fontSize: 24 }} />
                <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: 0.5 }}>
                  ICYMI
                </Typography>
              </Stack>

              {/* Vertical List of Mini Updates */}
              <Stack spacing={3}>
                {posts.slice(0, 6).map((post, i) => (
                  <Stack key={i} direction="row" spacing={2} alignItems="center">
                    <Box sx={{ width: 65, height: 65, borderRadius: '12px', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
                      <img src={post.CoverImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: '0.85rem', color: '#FFF', lineHeight: 1.2 }}>
                        {post.Title.length > 40 ? post.Title.substring(0, 40) + '...' : post.Title}
                      </Typography>
                      <Typography sx={{ color: BRAND.textMuted, fontSize: '0.7rem', mt: 0.5 }}>
                        {new Date(post.DatePosted).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>

              
            </Box>
          </Grid>

          {/* RIGHT COLUMN: MAIN GRID SECTION (Matches wireframe boxes) */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.015)',
                p: { xs: 2, md: 4 },
                borderRadius: '32px',
                border: '1px solid rgba(255,255,255,0.04)',
                minHeight: '800px' // Taller to accommodate the grid
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 4, px: 1 }}>
                NEW <span style={{ color: BRAND.gold }}>UPDATES</span>
              </Typography>

              {/* Static Grid of News Cards */}
              <Grid container spacing={3}>
                {filteredPosts.map((post) => (
                  <Grid item xs={12} sm={6} key={post.PostID}>
                    {/* This renders the card exactly as shown in your wireframe grid */}
                    <NewsCard post={post} />
                  </Grid>
                ))}
              </Grid>

              {/* Optional: If you have many posts, you could add Pagination here instead of a slider */}
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default News;