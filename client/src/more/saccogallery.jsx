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
  Box, Stack, TextField
} from "@mui/material";
import { AutoAwesome as SparkleIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  glass: "rgba(255, 255, 255, 0.05)",
  textMuted: "rgba(244, 244, 244, 0.7)",
};

const GlassCard = styled(motion.div)({
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
    "& .card-overlay": { opacity: 1, transform: "translateY(0)" },
    "& img": { transform: "scale(1.1)" }
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
    const query = searchQuery.toLowerCase();
    return photos.filter(p =>
      p.Title?.toLowerCase().includes(query) ||
      p.Description?.toLowerCase().includes(query)
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
      minHeight: "100vh", py: 10, position: "relative", bgcolor: BRAND.dark,
      backgroundImage: `url(https://res.cloudinary.com/djydkcx01/image/upload/v1768163060/camera_4_si2lla.png)`,
      backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed",
      "&::before": {
        content: '""', position: "absolute", inset: 0,
        background: `radial-gradient(circle at center, rgba(2, 21, 15, 0.4) 0%, rgba(2, 21, 15, 0.9) 100%)`,
        zIndex: 1
      }
    }}>
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        
        {/* Elite Header */}
        <Stack alignItems="center" spacing={2} sx={{ mb: 6, textAlign: "center" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <SparkleIcon sx={{ color: BRAND.gold, fontSize: "1.2rem" }} />
            <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 800, letterSpacing: 6 }}>
              THE OFFICIAL ARCHIVE
            </Typography>
          </Stack>

          <Typography variant="h1" sx={{
            color: "#FFF", fontWeight: 900, fontSize: { xs: "2.5rem", md: "4.5rem" },
            textTransform: 'uppercase', textShadow: "0 10px 30px rgba(0,0,0,0.7)"
          }}>
            GOLDEN <span style={{ color: BRAND.gold }}>GALLERY</span>
          </Typography>

          <Box sx={{ mt: 2, width: '100%', maxWidth: '500px' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search milestones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                '& .MuiOutlinedInput-root': {
                  color: '#FFF',
                  '& fieldset': { borderColor: 'rgba(236, 155, 20, 0.2)' },
                  '&:hover fieldset': { borderColor: BRAND.gold },
                  '&.Mui-focused fieldset': { borderColor: BRAND.gold },
                }
              }}
            />
          </Box>
        </Stack>

        {/* Gallery Grid */}
        <LightGallery speed={500} plugins={[lgZoom, lgThumbnail, lgAutoplay]} elementClassNames="gallery-wrapper">
          <Grid container spacing={3}>
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, idx) => (
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
                      data-sub-html={`<div style="padding:10px; text-align:center;">
                          <h3 style="color:${BRAND.gold}; font-weight:800;">${photo.Title}</h3>
                          <p style="color:#F4F4F4; opacity:0.8;">${photo.Description || ''}</p>
                        </div>`}
                    >
                      <Box sx={{ position: "relative", height: { xs: 300, md: 380 }, overflow: "hidden" }}>
                        <CardMedia
                          component="img"
                          image={photo.ImageURL}
                          alt={photo.Title}
                          sx={{ height: "100%", width: "100%", objectFit: "cover", transition: "0.8s ease" }}
                        />

                        <Box className="card-overlay" sx={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(to top, rgba(2, 21, 15, 0.95) 0%, transparent 70%)",
                          p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                          transform: "translateY(30px)", opacity: 0, transition: "0.4s ease"
                        }}>
                          <Typography variant="h6" sx={{ color: BRAND.gold, fontWeight: 900, mb: 0.5 }}>
                            {photo.Title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: BRAND.textMuted, mb: 1.5, opacity: 0.9 }}>
                            {photo.Description}
                          </Typography>
                          <Typography sx={{ color: BRAND.gold, fontSize: '0.65rem', fontWeight: 800, letterSpacing: 2 }}>
                            VIEW FULL IMAGE
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

        {/* Brand Footer */}
        <Box sx={{ py: 6, textAlign: 'center', mt: 4 }}>
                <Typography
                    sx={{
                        color: BRAND.gold,
                        letterSpacing: '3px',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        fontSize: { xs: '0.8rem', md: '1.35rem' }
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