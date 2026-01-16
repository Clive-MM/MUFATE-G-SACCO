import React, { useEffect, useState } from "react";
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
  Box, Stack, useTheme, useMediaQuery
} from "@mui/material";
import { AutoAwesome as SparkleIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  glass: "rgba(255, 255, 255, 0.05)",
  textMuted: "rgba(244, 244, 244, 0.7)",
};

const GlassCard = styled(motion.div)(({ theme }) => ({
  background: BRAND.glass,
  backdropFilter: "blur(15px)",
  borderRadius: "16px",
  border: `1.5px solid rgba(236, 155, 20, 0.15)`,
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    borderColor: BRAND.gold,
    boxShadow: `0 0 25px ${BRAND.gold}33`,
    "& .card-overlay": { 
      opacity: 1, 
      transform: "translateY(0)" 
    },
    "& img": { 
      transform: "scale(1.1)" 
    }
  },
  [theme.breakpoints.down('sm')]: {
    "& .card-overlay": { 
      opacity: 0.9, 
      transform: "translateY(0)",
      background: "linear-gradient(to top, rgba(2, 21, 15, 0.9) 0%, transparent 100%)",
    }
  }
}));

const SaccoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    axios.get("https://mufate-g-sacco.onrender.com/gallery")
      .then((res) => {
        const activePhotos = (res.data.gallery || []).filter(p => p.IsActive !== false);
        setPhotos(activePhotos);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", bgcolor: BRAND.dark }}>
      <CircularProgress sx={{ color: BRAND.gold }} />
      <Typography sx={{ color: BRAND.gold, mt: 3, fontWeight: 700, letterSpacing: isMobile ? 2 : 4, fontSize: isMobile ? '0.7rem' : '1rem' }}>
        ACCESSING SECURE ARCHIVES...
      </Typography>
    </Box>
  );

  return (
    <Box sx={{
      minHeight: "100vh", 
      py: { xs: 6, md: 10 }, 
      position: "relative", 
      bgcolor: BRAND.dark,
      backgroundImage: `url(https://res.cloudinary.com/djydkcx01/image/upload/v1768163060/camera_4_si2lla.png)`,
      backgroundSize: "cover", 
      backgroundPosition: "center", 
      backgroundAttachment: isMobile ? "scroll" : "fixed",
      "&::before": {
        content: '""', position: "absolute", inset: 0,
        background: `radial-gradient(circle at center, rgba(2, 21, 15, 0.4) 0%, rgba(2, 21, 15, 0.9) 100%)`,
        zIndex: 1
      }
    }}>
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        
        <Stack alignItems="center" spacing={isMobile ? 1 : 2} sx={{ mb: { xs: 4, md: 8 }, textAlign: "center" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <SparkleIcon sx={{ color: BRAND.gold, fontSize: isMobile ? "0.9rem" : "1.2rem" }} />
            <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 800, letterSpacing: { xs: 3, md: 6 }, fontSize: { xs: '0.6rem', md: '0.75rem' } }}>
              THE OFFICIAL ARCHIVE
            </Typography>
          </Stack>

          <Typography variant="h1" sx={{
            color: "#FFF", 
            fontWeight: 900, 
            fontSize: { xs: "2.2rem", sm: "3.5rem", md: "4.5rem" },
            textTransform: 'uppercase', 
            textShadow: "0 10px 30px rgba(0,0,0,0.7)",
            lineHeight: 1.1
          }}>
            GOLDEN <span style={{ color: BRAND.gold }}>MOMENTS</span>
          </Typography>
        </Stack>

        {/* CRITICAL FIX: key={photos.length} forces LightGallery to re-initialize 
          once the photos are loaded from the API. 
        */}
        <LightGallery 
          key={photos.length}
          speed={500} 
          plugins={[lgZoom, lgThumbnail, lgAutoplay]} 
          elementClassNames="gallery-wrapper"
          mobileSettings={{ controls: true, showCloseIcon: true, download: false }}
        >
          <Grid container spacing={isMobile ? 2 : 3}>
            <AnimatePresence mode="popLayout">
              {photos.map((photo, idx) => (
                <Grid item xs={12} sm={6} md={4} key={photo.PhotoID}>
                  <GlassCard
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.03 }}
                  >
                    <a
                      href={photo.ImageURL}
                      className="gallery-item"
                      data-src={photo.ImageURL}
                      data-sub-html={`<div style="padding:10px; text-align:center;">
                          <h3 style="color:${BRAND.gold}; font-weight:800; margin:0;">${photo.Title}</h3>
                          <p style="color:#F4F4F4; opacity:0.8; margin-top:5px;">${photo.Description || ''}</p>
                        </div>`}
                    >
                      <Box sx={{ position: "relative", height: { xs: 280, sm: 320, md: 380 }, overflow: "hidden" }}>
                        <CardMedia
                          component="img"
                          image={photo.ImageURL}
                          alt={photo.Title}
                          sx={{ height: "100%", width: "100%", objectFit: "cover", transition: "0.8s ease" }}
                        />

                        <Box className="card-overlay" sx={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(to top, rgba(2, 21, 15, 0.95) 0%, transparent 70%)",
                          p: { xs: 2, md: 3 }, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'flex-end',
                          transform: { xs: "none", md: "translateY(30px)" },
                          opacity: { xs: 1, md: 0 }, 
                          transition: "0.4s ease"
                        }}>
                          <Typography variant="h6" sx={{ color: BRAND.gold, fontWeight: 900, mb: 0.5, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                            {photo.Title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: BRAND.textMuted, mb: 1.5, opacity: 0.9, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {photo.Description}
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

        <Box sx={{ py: 6, textAlign: 'center', mt: 4 }}>
          <Typography
            sx={{
              color: BRAND.gold,
              letterSpacing: isMobile ? '2px' : '3px',
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: { xs: '0.65rem', md: '1.1rem' }
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