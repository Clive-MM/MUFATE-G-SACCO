import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Material UI
import {
  Box, Typography, Container, Grid, CardContent,
  Stack, CircularProgress, Button, TextField,
  InputAdornment, Collapse, useTheme, useMediaQuery
} from '@mui/material';

// Icons
import {
  Whatshot as HotIcon,
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

/* -------------------- NEWS CARD -------------------- */
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
        height: '100%',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: BRAND.gold
        }
      }}
    >
      <Box sx={{ height: 160, overflow: 'hidden' }}>
        <img
          src={post.CoverImage}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="caption"
          sx={{ color: BRAND.gold, fontWeight: 700, fontSize: '0.7rem' }}
        >
          {new Date(post.DatePosted).toLocaleDateString()}
        </Typography>

        <Typography
          sx={{
            color: '#FFF',
            fontWeight: 800,
            mt: 0.5,
            lineHeight: 1.2,
            fontSize: '0.95rem'
          }}
        >
          {post.Title}
        </Typography>

        <Collapse in={expanded}>
          <Typography sx={{ color: BRAND.textMuted, fontSize: '0.8rem', mt: 1 }}>
            {post.Content.replace(/<[^>]*>/g, '').substring(0, 100)}...
          </Typography>
        </Collapse>

        <Button
          onClick={() => setExpanded(!expanded)}
          endIcon={expanded ? <CloseIcon /> : <ExpandIcon />}
          sx={{
            color: BRAND.gold,
            p: 0,
            mt: 1,
            fontWeight: 900,
            fontSize: '0.7rem'
          }}
        >
          READ FULL STORY
        </Button>
      </CardContent>
    </Box>
  );
};

/* -------------------- MAIN PAGE -------------------- */
const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: BRAND.dark
        }}
      >
        <CircularProgress sx={{ color: BRAND.gold }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: BRAND.dark, color: '#FFF', py: 4 }}>
      <Container maxWidth="xl">

        {/* HEADER ROW (matches sketch) */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            THE <span style={{ color: BRAND.gold }}>NEWSROOM</span>
          </Typography>

          <TextField
            size="small"
            placeholder="Search..."
            sx={{
              width: 280,
              bgcolor: 'rgba(255,255,255,0.05)',
              borderRadius: '8px'
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterIcon sx={{ color: BRAND.gold }} />
                </InputAdornment>
              ),
              sx: { color: '#FFF' }
            }}
          />
        </Grid>

        {/* MAIN CONTENT */}
        <Grid container spacing={3} alignItems="flex-start">

          {/* ICYMI (LEFT) */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                position: 'sticky',
                top: 20,
                bgcolor: 'rgba(255,255,255,0.03)',
                borderRadius: '20px',
                p: 2.5,
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                <HotIcon sx={{ color: BRAND.gold }} />
                <Typography sx={{ fontWeight: 900 }}>ICYMI</Typography>
              </Stack>

              <Stack spacing={2.5}>
                {posts.slice(0, 5).map((post, i) => (
                  <Stack key={i} direction="row" spacing={1.5}>
                    <Box sx={{ width: 50, height: 50, borderRadius: 1, overflow: 'hidden' }}>
                      <img
                        src={post.CoverImage}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 800 }}>
                        {post.Title.substring(0, 32)}...
                      </Typography>
                      <Typography sx={{ fontSize: '0.65rem', color: BRAND.textMuted }}>
                        {new Date(post.DatePosted).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* NEWS GRID (RIGHT) */}
          <Grid item xs={12} md={9}>
            <Typography sx={{ fontWeight: 900, mb: 2 }}>
              NEW UPDATE
            </Typography>

            <Grid container spacing={2}>
              {posts.slice(0, isDesktop ? 6 : 4).map(post => (
                <Grid key={post.PostID} item xs={12} sm={6} md={4}>
                  <NewsCard post={post} />
                </Grid>
              ))}
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default News;
