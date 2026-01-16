import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import LightGallery from "lightgallery/react";

// LightGallery Plugins
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgAutoplay from "lightgallery/plugins/autoplay";

// Styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// Material UI
import {
  Container, Typography, Grid, CardMedia, CircularProgress,
  Box, Stack, TextField, InputAdornment
} from "@mui/material";
import {
  AutoAwesome as SparkleIcon,
  FilterList as FilterIcon
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Standardized Brand Colors from News/NewsFeed
const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  light: "#F4F4F4",
  glass: "rgba(255, 255, 255, 0.05)", // Matches NewsFeed cardBg
  textMuted: "rgba(244, 244, 244, 0.7)",
};

const GlassCard = styled(motion.div)({
  background: BRAND.glass,
  backdropFilter: "blur(15px)",
  borderRadius: "16px", // Standardized with NewsFeed cards
  border: `1.5px solid rgba(236, 155, 20, 0.15)`, // Standardized border
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    borderColor: BRAND.gold,
    boxShadow: `0 0 20px ${BRAND.gold}44`,
    "& .card-overlay": { opacity: 1, transform: "translateY(0)" },
    "& img": { transform: "scale(1.08)" }
  }
});

const SaccoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("https://mufate-g-sacco.onrender.com/gallery")
      .then((res) => {
        const activePhotos = (res.data.gallery || []).filter(p => p.IsActive !== false);
        setPhotos(activePhotos);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter(p =>
      p.Title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.Description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, photos]);

  if (loading) return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", bgcolor: BRAND.dark }}>
      <CircularProgress sx={{ color: BRAND.gold }} />
      <Typography sx={{ color: BRAND.gold, mt: 3, fontWeight: 700, letterSpacing: 4 }}>
        ACCESSING SECURE ARCHIVES...
      </Typography>
    </Box>
  );

  return (
    <Box sx={{
      minHeight: "100vh",
      py: 10,
      position: "relative",
      bgcolor: BRAND.dark,
      backgroundImage: `url(https://res.cloudinary.com/djydkcx01/image/upload/v1768163060/camera_4_si2lla.png)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle at center, rgba(2, 21, 15, 0.4) 0%, rgba(2, 21, 15, 0.9) 100%)`,
        zIndex: 1
      }
    }}>

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>

        {/* Elite Header */}
        <Stack alignItems="center" spacing={2} sx={{ mb: 6, textAlign: "center" }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <SparkleIcon sx={{ color: BRAND.gold, fontSize: "1.2rem" }} />
              <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 800, letterSpacing: 6 }}>
                THE OFFICIAL ARCHIVE
              </Typography>
            </Stack>
          </motion.div>

          <Typography variant="h1" sx={{
            color: "#FFF", 
            fontWeight: 900,
            fontSize: { xs: "2rem", md: "4rem" },
            textTransform: 'uppercase',
            textShadow: "0 10px 20px rgba(0,0,0,0.5)"
          }}>
            GOLDEN <span style={{ color: BRAND.gold }}>GALLERY</span>
          </Typography>

          {/* Integrated Search Bar Styled like NewsFeed elements */}
          <Box sx={{ mt: 4, width: '100%', maxWidth: '600px' }}>
            <TextField
              fullWidth
              placeholder="Search milestones or events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterIcon sx={{ color: BRAND.gold }} />
                  </InputAdornment>
                ),
                sx: {
                  color: '#FFF',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  '& fieldset': { borderColor: 'rgba(236, 155, 20, 0.3)' },
                  '&:hover fieldset': { borderColor: BRAND.gold },
                  '&.Mui-focused fieldset': { borderColor: BRAND.gold },
                }
              }}
            />
          </Box>
        </Stack>

        {/* Main Gallery Grid */}
        <LightGallery
          speed={500}
          plugins={[lgZoom, lgThumbnail, lgAutoplay]}
          elementClassNames="gallery-wrapper"
        >
          <Grid container spacing={3}>
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, idx) => (
                <Grid item xs={12} sm={6} md={4} key={photo.PhotoID}>
                  <GlassCard
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <a
                      href={photo.ImageURL}
                      data-sub-html={`<div style="padding:10px; text-align:center;">
                            <h3 style="color:${BRAND.gold}; font-weight:800;">${photo.Title}</h3>
                            <p style="color:#F4F4F4; opacity:0.8;">${photo.Description || ''}</p>
                        </div>`}
                    >
                      <Box sx={{ position: "relative", height: { xs: 350, md: 400 }, overflow: "hidden" }}>
                        <CardMedia
                          component="img"
                          image={photo.ImageURL}
                          alt={photo.Title}
                          sx={{ height: "100%", width: "100%", objectFit: "cover", transition: "0.6s ease-in-out" }}
                        />

                        {/* Overlay Content Styled like Newsroom Hover */}
                        <Box className="card-overlay" sx={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(to top, rgba(2, 21, 15, 1) 0%, rgba(2, 21, 15, 0.4) 60%, transparent 100%)",
                          p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                          transform: "translateY(20px)", opacity: 0, transition: "0.4s ease"
                        }}>
                          <Typography variant="h6" sx={{ color: BRAND.gold, fontWeight: 900, mb: 1 }}>
                            {photo.Title}
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{
                              color: BRAND.textMuted,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              lineHeight: 1.4,
                              mb: 1
                            }}
                          >
                            {photo.Description}
                          </Typography>
                          
                          <Typography sx={{ color: BRAND.gold, fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>
                            Click to Enlarge
                          </Typography>
                        </Box>
                      </Box>
                    </a>
                  </GlassCard>
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
        </LightGallery>

        {/* Standardized Brand Footer */}
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography
            sx={{
              color: BRAND.gold,
              letterSpacing: '3px',
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: { xs: '0.8rem', md: '1.2rem' }
            }}
          >
            GOLDEN GENERATION DT SACCO © {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SaccoGallery;