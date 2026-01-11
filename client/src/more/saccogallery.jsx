import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// LightGallery Imports
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgAutoplay from "lightgallery/plugins/autoplay";

// Material UI Imports
import {
  Container, Typography, Grid, CardMedia,
  CircularProgress, Box, Stack, Divider,
  IconButton, useMediaQuery, useTheme
} from "@mui/material";
import { 
  Collections as GalleryIcon, 
  AutoAwesome as SparkleIcon,
  Search as ZoomIcon 
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  glass: "rgba(255, 255, 255, 0.03)",
  textMuted: "rgba(244, 244, 244, 0.6)",
};

const GlassCard = styled(motion.div)({
  background: BRAND.glass,
  backdropFilter: "blur(12px)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
  "&:hover": {
    border: `1px solid ${BRAND.gold}`,
    "& .overlay": { opacity: 1 },
    "& img": { transform: "scale(1.1)" }
  }
});

const SaccoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    axios.get("https://mufate-g-sacco.onrender.com/gallery")
      .then((res) => {
        setPhotos(res.data.gallery || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load gallery:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <Box sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", bgcolor: BRAND.dark }}>
      <CircularProgress sx={{ color: BRAND.gold }} />
      <Typography sx={{ color: BRAND.gold, mt: 2, fontWeight: 700, letterSpacing: 2 }}>LOADING MASTERPIECES...</Typography>
    </Box>
  );

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      py: 10, 
      position: "relative", 
      overflow: "hidden",
      backgroundColor: BRAND.dark,
      // --- BACKGROUND IMAGE & GREENISH SHADOW IMPLEMENTATION ---
      backgroundImage: `url(https://res.cloudinary.com/djydkcx01/image/upload/v1768160651/camera_background_tq9lbp.png)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        // This creates the deep green tint and the side shadows
        background: `linear-gradient(135deg, rgba(2, 21, 15, 0.95) 0%, rgba(2, 21, 15, 0.7) 50%, rgba(2, 21, 15, 0.95) 100%)`,
        zIndex: 1
      }
    }}>
      
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        
        {/* Header Section */}
        <Stack alignItems="center" spacing={1} sx={{ mb: 8, textAlign: "center" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <SparkleIcon sx={{ color: BRAND.gold, fontSize: "1rem" }} />
            <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 900, letterSpacing: 4 }}>
              Visual Excellence
            </Typography>
          </Stack>
          <Typography variant="h2" sx={{ color: "#FFF", fontWeight: 900, fontSize: { xs: "2.5rem", md: "4rem" }, textTransform: "uppercase" }}>
            GOLDEN <span style={{ color: BRAND.gold }}>GALLERY</span>
          </Typography>
          <Typography sx={{ color: BRAND.textMuted, maxWidth: "600px", fontSize: "1.1rem" }}>
            Witness the growth, impact, and vibrant community of Golden Generation DT SACCO through our curated visual history.
          </Typography>
        </Stack>

        <LightGallery 
          speed={500} 
          plugins={[lgZoom, lgThumbnail, lgAutoplay]} 
          elementClassNames="custom-gallery-grid"
          mode="lg-fade"
        >
          <Grid container spacing={3}>
            {photos.map((photo, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <GlassCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <a href={photo.ImageURL} data-sub-html={`<h4 style="color:${BRAND.gold}">${photo.Title}</h4>`}>
                    <Box sx={{ position: "relative", overflow: "hidden", height: 350 }}>
                      <CardMedia
                        component="img"
                        image={photo.ImageURL}
                        alt={photo.Title}
                        sx={{ 
                          height: "100%", 
                          width: "100%", 
                          objectFit: "cover",
                          transition: "transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)"
                        }}
                      />
                      
                      <Box className="overlay" sx={{ 
                        position: "absolute", inset: 0, 
                        background: "linear-gradient(to top, rgba(2,21,15,0.95) 0%, transparent 60%)",
                        display: "flex", flexDirection: "column", justifyContent: "flex-end",
                        p: 3, opacity: 0.8, transition: "opacity 0.4s"
                      }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                             <Typography variant="h6" sx={{ color: "#FFF", fontWeight: 800, lineHeight: 1.2 }}>
                               {photo.Title}
                             </Typography>
                             <Typography variant="caption" sx={{ color: BRAND.gold, fontWeight: 700, textTransform: "uppercase" }}>
                               SACCO Milestone
                             </Typography>
                          </Box>
                          <IconButton sx={{ bgcolor: BRAND.gold, color: BRAND.dark, "&:hover": { bgcolor: "#FFF" } }}>
                            <ZoomIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Box>
                    </Box>
                  </a>
                </GlassCard>
              </Grid>
            ))}
          </Grid>
        </LightGallery>

        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 10, opacity: 0.4 }} spacing={2}>
           <Divider sx={{ width: 100, borderColor: BRAND.gold }} />
           <GalleryIcon sx={{ color: BRAND.gold }} />
           <Divider sx={{ width: 100, borderColor: BRAND.gold }} />
        </Stack>
      </Container>
    </Box>
  );
};

export default SaccoGallery;