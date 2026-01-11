import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import AOS from 'aos';

// Material UI
import {
  Box, Typography, Container, Grid, CardContent, IconButton, 
  Stack, CircularProgress, Button, TextField, InputAdornment, 
  Divider, useTheme, useMediaQuery
} from '@mui/material';

// Icons
import { 
  Whatshot as HotIcon, 
  AccessTime as TimeIcon,
  AutoAwesome as SparkleIcon,
  ChevronLeft as LeftIcon, 
  ChevronRight as RightIcon,
  FilterList as FilterIcon,
  Newspaper as NewsIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Slick Slider CSS
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F", // The primary solid background color
  glass: "rgba(255, 255, 255, 0.03)",
  textMuted: "rgba(244, 244, 244, 0.7)",
};

const EnhancedGlassCard = styled(motion.div)({
  background: BRAND.glass,
  backdropFilter: "blur(15px)",
  borderRadius: "28px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  overflow: "hidden",
  position: "relative",
  height: '100%',
  transition: "all 0.4s ease-in-out",
  "&:hover": {
    border: `1px solid ${BRAND.gold}`,
    "& img": { transform: "scale(1.08)" }
  }
});

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

  const icymiPosts = posts.slice(0, 4); 

  const sliderSettings = {
    dots: false,
    infinite: filteredPosts.length > (isMobile ? 1 : 2),
    speed: 800,
    slidesToShow: isMobile ? 1 : 2,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  if (loading) return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", bgcolor: BRAND.dark }}>
      <CircularProgress sx={{ color: BRAND.gold }} />
      <Typography sx={{ color: BRAND.gold, mt: 3, fontWeight: 700, letterSpacing: 4 }}>
        SYNCING LATEST UPDATES...
      </Typography>
    </Box>
  );

  return (
    <Box sx={{
      minHeight: "100vh", 
      py: { xs: 6, md: 10 }, 
      position: "relative", 
      bgcolor: BRAND.dark, // Clean simple background as requested
    }}>
      
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        
        {/* Elite Header - Consistent Typography but without complex bg */}
        <Stack alignItems="center" spacing={2} sx={{ mb: 8, textAlign: "center" }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <SparkleIcon sx={{ color: BRAND.gold, fontSize: "1.2rem" }} />
              <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 800, letterSpacing: 6 }}>
                INSIGHTS & UPDATES
              </Typography>
            </Stack>
          </motion.div>

          <Typography variant="h1" sx={{ 
            color: "#FFF", fontWeight: 900, 
            fontSize: { xs: "1.7rem", md: "3rem" }, 
            textShadow: "0 10px 20px rgba(0,0,0,0.5)",
            textTransform: "uppercase"
          }}>
            THE <span style={{ color: BRAND.gold }}>NEWSROOM</span>
          </Typography>

          {/* Polished Glassmorphism Search Bar */}
          <Stack direction="row" justifyContent="center" sx={{ mt: 4, width: '100%' }}>
            <TextField 
              sx={{ 
                maxWidth: '600px', 
                width: '100%',
                backdropFilter: "blur(12px)",
                borderRadius: '15px',
                overflow: 'hidden'
              }}
              placeholder="Search articles, headlines, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterIcon sx={{ color: BRAND.gold, ml: 1 }} />
                  </InputAdornment>
                ),
                sx: { 
                  color: '#FFF', 
                  bgcolor: 'rgba(255, 255, 255, 0.08)', 
                  '& fieldset': { borderColor: 'rgba(236, 155, 20, 0.4)' },
                  '&:hover fieldset': { borderColor: BRAND.gold },
                  '&.Mui-focused fieldset': { borderColor: BRAND.gold, borderWidth: '2px' },
                }
              }}
            />
          </Stack>
        </Stack>

        <Grid container spacing={6}>
          {/* LEFT: Main Feed Slider */}
          <Grid item xs={12} md={8}>
            <Box sx={{ position: 'relative' }}>
              <Slider ref={sliderRef} {...sliderSettings}>
                {filteredPosts.map((post) => (
                  <Box key={post.PostID} sx={{ px: 1.5, pb: 4 }}>
                    <EnhancedGlassCard>
                      <Box sx={{ height: 260, overflow: 'hidden' }}>
                        <motion.img 
                          src={post.CoverImage} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.6s ease' }}
                          whileHover={{ scale: 1.1 }}
                        />
                      </Box>
                      <CardContent sx={{ p: 4 }}>
                        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                          <Typography variant="caption" sx={{ color: BRAND.gold, fontWeight: 700, letterSpacing: 1 }}>
                            {new Date(post.DatePosted).toLocaleDateString(undefined, { dateStyle: 'long' })}
                          </Typography>
                          <Typography variant="caption" sx={{ color: BRAND.textMuted }}>• 5 MIN READ</Typography>
                        </Stack>
                        
                        <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 800, mb: 2, lineHeight: 1.3, height: '65px', overflow: 'hidden' }}>
                          {post.Title}
                        </Typography>
                        
                        <Typography sx={{ color: BRAND.textMuted, fontSize: '0.95rem', mb: 3, height: '60px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          {post.Content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                        </Typography>
                        
                        <Button 
                          sx={{ 
                            color: BRAND.gold, 
                            p: 0, 
                            fontWeight: 900, 
                            fontSize: '0.85rem',
                            '&:hover': { background: 'transparent', letterSpacing: '1px' },
                            transition: '0.3s ease'
                          }}
                        >
                          READ FULL STORY —
                        </Button>
                      </CardContent>
                    </EnhancedGlassCard>
                  </Box>
                ))}
              </Slider>

              {/* Navigation Arrows */}
              <Stack direction="row" spacing={2} sx={{ mt: 2, px: 1.5 }}>
                <IconButton 
                  onClick={() => sliderRef.current.slickPrev()} 
                  sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: BRAND.gold, border: '1px solid rgba(236, 155, 20, 0.2)' }}
                >
                  <LeftIcon />
                </IconButton>
                <IconButton 
                  onClick={() => sliderRef.current.slickNext()} 
                  sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: BRAND.gold, border: '1px solid rgba(236, 155, 20, 0.2)' }}
                >
                  <RightIcon />
                </IconButton>
              </Stack>
            </Box>
          </Grid>

          {/* RIGHT: ICYMI Sidebar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              position: 'sticky', 
              top: 100,
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(15px)",
              borderRadius: "28px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              p: 3,
              boxShadow: "0 10px 40px rgba(0,0,0,0.4)"
            }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 4 }}>
                    <HotIcon sx={{ color: BRAND.gold, fontSize: '1.5rem' }} />
                    <Typography variant="h5" sx={{ fontWeight: 900, color: '#FFF', letterSpacing: '1px' }}>
                      ICYMI
                    </Typography>
                </Stack>
                
                <Stack spacing={3}>
                    {icymiPosts.map((post, i) => (
                        <motion.div key={i} whileHover={{ x: 10 }} style={{ cursor: 'pointer' }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={4}>
                                    <Box sx={{ height: 80, borderRadius: '15px', overflow: 'hidden', border: `1px solid ${BRAND.gold}33` }}>
                                        <img src={post.CoverImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                                    </Box>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="body1" sx={{ color: '#FFF', fontWeight: 700, lineHeight: 1.2, mb: 1, fontSize: '0.9rem' }}>
                                        {post.Title}
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <TimeIcon sx={{ fontSize: '0.8rem', color: BRAND.gold }} />
                                        <Typography variant="caption" sx={{ color: BRAND.textMuted, fontWeight: 600 }}>
                                            {new Date(post.DatePosted).toLocaleDateString()}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </motion.div>
                    ))}
                </Stack>

                <Box sx={{ 
                  mt: 4, 
                  p: 2, 
                  borderRadius: '15px', 
                  background: 'rgba(236, 155, 20, 0.05)', 
                  border: '1px solid rgba(236, 155, 20, 0.2)' 
                }}>
                  <Typography variant="subtitle2" sx={{ color: BRAND.gold, fontWeight: 800, mb: 0.5 }}>
                    Secure Updates
                  </Typography>
                  <Typography variant="caption" sx={{ color: BRAND.textMuted }}>
                    Financial insights from the Golden Generation DT SACCO.
                  </Typography>
                </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Accent */}
        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 15, opacity: 0.2 }} spacing={3}>
           <Divider sx={{ width: 100, borderColor: BRAND.gold }} />
           <NewsIcon sx={{ color: BRAND.gold, fontSize: "2.5rem" }} />
           <Divider sx={{ width: 100, borderColor: BRAND.gold }} />
        </Stack>
      </Container>
    </Box>
  );
};

export default News;