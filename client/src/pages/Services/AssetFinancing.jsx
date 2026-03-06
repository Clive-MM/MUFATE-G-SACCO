import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import {
  Box, Typography, CircularProgress,
  Card, CardContent, CardMedia, IconButton
} from '@mui/material';
import {
  SkipPrevious as SkipPreviousIcon,
  PlayArrow as PlayArrowIcon,
  SkipNext as SkipNextIcon
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
  const [preloadedImages, setPreloadedImages] = useState({});

  // 1. Optimized Data Fetching
  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);

    axios.get(ASSET_API_URL, { cancelToken: source.token })
      .then((res) => {
        if (res.data.success && res.data.assets?.length > 0) {
          setAssetData(res.data.assets);
        } else {
          setError(res.data.message || 'No records found.');
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError('Network error: Unable to load asset images.');
          setLoading(false);
        }
      });

    return () => source.cancel();
  }, []);

  // 2. Performance: Pre-fetch Next Image in Cache
  useEffect(() => {
    if (assetData.length > 0) {
      const nextIndex = (currentIndex + 1) % assetData.length;
      const imgUrl = assetData[nextIndex].image_url;
      
      if (!preloadedImages[imgUrl]) {
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => setPreloadedImages(prev => ({ ...prev, [imgUrl]: true }));
      }
    }
  }, [currentIndex, assetData, preloadedImages]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % assetData.length);
  }, [assetData.length]);

  const handlePrevious = () => {
    if (assetData.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? assetData.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (loading || error || assetData.length <= 1 || !isPlaying) return;
    const timer = setInterval(handleNext, ROTATION_INTERVAL_SEC * 1000);
    return () => clearInterval(timer);
  }, [loading, error, assetData.length, isPlaying, handleNext]);

  if (loading) {
    return (
      <Card sx={{ display: 'flex', bgcolor: BRAND.dark, borderRadius: '24px', minHeight: '500px' }}>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        mb: 6,
      }}
    >
      {/* LEFT SIDE: PHOTO CANVAS */}
      <Box
        sx={{
          position: 'relative',
          width: { xs: '100%', md: '65%' },
          height: { xs: '350px', md: '600px' }, // Fixed height removes white gaps
          bgcolor: '#000',
          overflow: 'hidden',
        }}
      >
        {assetData.map((asset, index) => (
          <Box
            key={asset.id || index}
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
            }}
          >
            <CardMedia
              component="img"
              image={asset.image_url}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // Ensures image fills container perfectly
                objectPosition: 'center',
                // Modern Stylistic Animation: Ken Burns Zoom
                transition: 'transform 8s linear',
                transform: index === currentIndex ? 'scale(1.15)' : 'scale(1)',
              }}
            />
            {/* Cinematic Overlay to blend with text side */}
            <Box sx={{
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(to right, transparent 80%, rgba(2,21,15,1) 100%)',
              zIndex: 2,
              display: { xs: 'none', md: 'block' }
            }} />
          </Box>
        ))}
      </Box>

      {/* RIGHT SIDE: CONTENT & CONTROLS */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        width: { xs: '100%', md: '35%' },
        bgcolor: BRAND.dark,
        zIndex: 3
      }}>
        <CardContent sx={{ 
          flex: '1 0 auto', 
          p: { xs: 4, md: 6 }, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center' 
        }}>
          
          <Typography 
            variant="h3" 
            sx={{ 
              color: BRAND.light, 
              fontWeight: 900, 
              mb: 3, 
              fontSize: { md: '2.5rem', xs: '1.8rem' },
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}
          >
            ASSET <span style={{ color: BRAND.gold }}>FINANCING</span>
          </Typography>
          <Typography 
            sx={{ 
              color: 'rgba(244, 244, 244, 0.7)', 
              mb: 4, 
              lineHeight: 1.8, 
              fontSize: '1.05rem' 
            }}
          >
            Acquire the equipment or machinery you need today through our flexible asset financing. 
            We fund your purchase and use the asset as security while you repay in affordable installments 
            — giving you full ownership once the loan is cleared.
          </Typography>
        </CardContent>

        {/* ERGONOMIC CONTROLS */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 4, pb: 4, gap: 2 }}>
          <IconButton 
            onClick={handlePrevious} 
            sx={{ 
              color: BRAND.light, 
              border: '1px solid rgba(255,255,255,0.1)',
              '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark } 
            }}
          >
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          
          <IconButton 
            onClick={() => setIsPlaying(!isPlaying)} 
            sx={{ 
              bgcolor: BRAND.gold, 
              color: BRAND.dark,
              width: 50,
              height: 50,
              '&:hover': { bgcolor: BRAND.light } 
            }}
          >
            <PlayArrowIcon sx={{ 
              transform: isPlaying ? 'rotate(90deg)' : 'none', 
              transition: '0.3s' 
            }} />
          </IconButton>

          <IconButton 
            onClick={handleNext} 
            sx={{ 
              color: BRAND.light, 
              border: '1px solid rgba(255,255,255,0.1)',
              '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark } 
            }}
          >
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default AssetFinancing;