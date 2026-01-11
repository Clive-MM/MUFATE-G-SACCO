import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import LightGallery from "lightgallery/react";

// LightGallery Plugins
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgAutoplay from "lightgallery/plugins/autoplay";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// Material UI
import {
  Container, Typography, Grid, CardMedia, CircularProgress,
  Box, Stack, Divider, IconButton, Chip, Button, TextField, InputAdornment
} from "@mui/material";
import {
  Collections as GalleryIcon,
  AutoAwesome as SparkleIcon,
  Search as ZoomIcon,
  ArrowForward as ArrowIcon,
  FilterList as FilterIcon
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  glass: "rgba(255, 255, 255, 0.03)",
  textMuted: "rgba(244, 244, 244, 0.7)",
};

const GlassCard = styled(motion.div)({
  background: BRAND.glass,
  backdropFilter: "blur(15px)",
  borderRadius: "28px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  "&:hover": {
    border: `1px solid ${BRAND.gold}`,
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
        // Filter by IsActive from your DB model
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
      <Typography sx={{ color: BRAND.gold, mt: 3, fontWeight: 700, letterSpacing: 4 }}>ACCESSING SECURE ARCHIVES...</Typography>
    </Box>
  );

  return (
    <Box sx={{
      minHeight: "100vh", py: 10, position: "relative", bgcolor: BRAND.dark,
      backgroundImage: `url(https://res.cloudinary.com/djydkcx01/image/upload/v1768161885/CAMERA_5_owwyrh.png)`,
      backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed",
      "&::before": {
        content: '""', position: "absolute", inset: 0,
        background: `radial-gradient(circle at center, rgba(2, 21, 15, 0.75) 0%, rgba(2, 21, 15, 0.98) 100%)`,
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
            color: "#FFF", fontWeight: 900, 
            fontSize: { xs: "2.8rem", md: "5rem" }, 
            textShadow: "0 10px 20px rgba(0,0,0,0.5)"
          }}>
            GOLDEN <span style={{ color: BRAND.gold }}>GALLERY</span>
          </Typography>

          {/* Search and Stats Bar */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center" sx={{ mt: 4, width: '100%', maxWidth: '800px' }}>
            <TextField 
              fullWidth
              placeholder="Search milestones, events, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><FilterIcon sx={{ color: BRAND.gold }} /></InputAdornment>,
                sx: { 
                  color: '#FFF', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '15px',
                  '& fieldset': { borderColor: 'rgba(236, 155, 20, 0.3)' },
                  '&:hover fieldset': { borderColor: BRAND.gold },
                }
              }}
            />
            <Chip 
              label={`${filteredPhotos.length} ACTIVE MEMORIES`} 
              sx={{ bgcolor: BRAND.gold, color: BRAND.dark, fontWeight: 900, height: '45px', px: 2 }} 
            />
          </Stack>
        </Stack>

        {/* Main Gallery Grid */}
        <LightGallery 
          speed={500} 
          plugins={[lgZoom, lgThumbnail, lgAutoplay]} 
          elementClassNames="gallery-wrapper"
        >
          <Grid container spacing={4}>
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
                    {/* LightGallery link uses Title and Description from your Model */}
                    <a 
                        href={photo.ImageURL} 
                        data-sub-html={`<div style="padding:10px;">
                            <h3 style="color:${BRAND.gold}; margin-bottom:5px;">${photo.Title}</h3>
                            <p style="color:#eee;">${photo.Description || ''}</p>
                        </div>`}
                    >
                      <Box sx={{ position: "relative", height: 400, overflow: "hidden" }}>
                        <CardMedia
                          component="img"
                          image={photo.ImageURL}
                          alt={photo.Title}
                          sx={{ height: "100%", width: "100%", objectFit: "cover", transition: "0.6s ease-in-out" }}
                        />
                        
                        <Box className="card-overlay" sx={{ 
                          position: "absolute", bottom: 0, inset: 0,
                          background: "linear-gradient(to top, rgba(2,21,15,1) 0%, rgba(2,21,15,0.4) 50%, transparent 100%)",
                          p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                          transform: "translateY(20px)", opacity: 0, transition: "0.4s ease"
                        }}>
                          <Typography variant="h6" sx={{ color: "#FFF", fontWeight: 800 }}>{photo.Title}</Typography>
                          
                          {/* Display short snippet of Description */}
                          <Typography variant="caption" sx={{ color: BRAND.textMuted, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 2 }}>
                            {photo.Description}
                          </Typography>

                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="caption" sx={{ color: BRAND.gold, fontWeight: 700, letterSpacing: 1 }}>
                               VIEW DETAILS
                            </Typography>
                            <IconButton sx={{ bgcolor: BRAND.gold, color: BRAND.dark }}>
                              <ZoomIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Box>
                      </Box>
                    </a>
                  </GlassCard>
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
        </LightGallery>

        {/* CTA Section */}
        <Box sx={{ mt: 15, p: { xs: 4, md: 8 }, borderRadius: "40px", background: "rgba(236, 155, 20, 0.03)", border: `1px solid ${BRAND.gold}33`, textAlign: "center", position: 'relative', overflow: 'hidden' }}>
          <Typography variant="h3" sx={{ color: "#FFF", fontWeight: 900, mb: 2 }}>Ready to Secure Your Future?</Typography>
          <Typography sx={{ color: BRAND.textMuted, mb: 4, maxWidth: '600px', mx: 'auto' }}>
             The milestones above represent thousands of lives changed. Join Golden Generation DT SACCO today and let's build your legacy together.
          </Typography>
          <Button 
            variant="contained" 
            endIcon={<ArrowIcon />}
            sx={{ 
              bgcolor: BRAND.gold, color: BRAND.dark, fontWeight: 900, px: 6, py: 2, borderRadius: "50px",
              boxShadow: `0 0 20px ${BRAND.gold}44`,
              "&:hover": { bgcolor: "#FFF", transform: "translateY(-3px)", boxShadow: `0 10px 30px ${BRAND.gold}66` }
            }}
          >
            BECOME A MEMBER
          </Button>
        </Box>

        {/* Footer Accent */}
        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 10, opacity: 0.2 }} spacing={3}>
           <Divider sx={{ width: 100, borderColor: BRAND.gold }} />
           <GalleryIcon sx={{ color: BRAND.gold, fontSize: "2.5rem" }} />
           <Divider sx={{ width: 100, borderColor: BRAND.gold }} />
        </Stack>
      </Container>
    </Box>
  );
};

export default SaccoGallery;