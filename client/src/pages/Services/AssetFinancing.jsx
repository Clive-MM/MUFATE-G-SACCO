import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import {
  Box, Typography, Link, Zoom, Skeleton, CircularProgress, 
  Card, CardContent, CardMedia, IconButton
} from '@mui/material';
import { 
  ArrowForward, SkipPrevious as SkipPreviousIcon, 
  PlayArrow as PlayArrowIcon, SkipNext as SkipNextIcon 
} from '@mui/icons-material';

// --- CONFIGURATION ---
const ASSET_API_URL = `${process.env.REACT_APP_API_BASE_URL}/asset-financing`;
const ROTATION_INTERVAL_SEC = 8; 

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
};

const AssetFinancing = () => {
  const theme = useTheme();
  const [assetData, setAssetData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // 1. Fetch Data
  useEffect(() => {
    setLoading(true);
    axios.get(ASSET_API_URL)
      .then((res) => {
        if (res.data.success && res.data.assets?.length > 0) {
          setAssetData(res.data.assets);
        } else {
          setError(res.data.message || 'No financing records found.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Network error: Unable to reach the server.');
        setLoading(false);
      });
  }, []);

  // 2. Wrap handleNext in useCallback to fix the dependency warning
  const handleNext = useCallback(() => {
    setAssetData((prevData) => {
      if (prevData.length === 0) return prevData;
      setCurrentIndex((prevIndex) => (prevIndex + 1) % prevData.length);
      return prevData;
    });
  }, []);

  const handlePrevious = () => {
    if (assetData.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? assetData.length - 1 : prev - 1));
  };

  // 3. Rotation Logic
  useEffect(() => {
    if (loading || error || assetData.length <= 1 || !isPlaying) return;

    const timer = setInterval(() => {
      handleNext();
    }, ROTATION_INTERVAL_SEC * 1000);

    return () => clearInterval(timer);
  }, [loading, error, assetData.length, isPlaying, handleNext]); // handleNext is now a stable dependency

  if (loading) {
    return (
      <Card sx={{ display: 'flex', bgcolor: BRAND.dark, borderRadius: '16px', mb: 6, minHeight: '450px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 4 }}>
          <Skeleton variant="text" width="60%" height={40} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Skeleton variant="rectangular" width="100%" height={200} sx={{ mt: 2, bgcolor: 'rgba(255,255,255,0.05)' }} />
        </Box>
        <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress sx={{ color: BRAND.gold }} />
        </Box>
      </Card>
    );
  }

  return (
    <Card 
      sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        bgcolor: BRAND.dark, 
        color: BRAND.light,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        border: `1px solid rgba(255,255,255,0.05)`,
        mb: 6,
        minHeight: { md: '500px' }
      }}
    >
      {/* LEFT SIDE: PHOTO PANE (Side by side) */}
      <Box sx={{ position: 'relative', width: { xs: '100%', md: '60%' }, height: { xs: '300px', md: 'auto' } }}>
        {assetData.map((asset, index) => (
          <Zoom key={asset.id || index} in={index === currentIndex} timeout={1000} mountOnEnter unmountOnExit>
            <CardMedia
              component="img"
              image={asset.image_url}
              alt="Financing"
              sx={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Zoom>
        ))}
      </Box>

      {/* RIGHT SIDE: CONTENT PANE (Media Control Style) */}
      <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', md: '40%' } }}>
        <CardContent sx={{ flex: '1 0 auto', p: { xs: 4, md: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h4" sx={{ color: BRAND.gold, fontWeight: 800, mb: 2, textTransform: 'uppercase' }}>
            Asset Financing
          </Typography>
          <Typography sx={{ color: BRAND.light, mb: 4, lineHeight: 1.8, opacity: 0.9 }}>
            Acquire the equipment, machinery, or tools you need today through our 
            flexible asset financing. Repay in affordable installments while using the asset as security.
          </Typography>
          <Link href="/products/asset-financing" sx={{ color: BRAND.gold, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            Apply Now <ArrowForward />
          </Link>
        </CardContent>

        {/* CONTROLS */}
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 4, pb: 4 }}>
          <IconButton onClick={handlePrevious} sx={{ color: BRAND.gold }}>
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton onClick={() => setIsPlaying(!isPlaying)} sx={{ color: BRAND.gold }}>
            <PlayArrowIcon sx={{ height: 38, width: 38, transform: isPlaying ? 'rotate(90deg)' : 'none', transition: '0.3s' }} />
          </IconButton>
          <IconButton onClick={handleNext} sx={{ color: BRAND.gold }}>
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default AssetFinancing;