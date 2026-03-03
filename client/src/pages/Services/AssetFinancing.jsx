import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import {
  Box, Typography, Zoom, Skeleton, CircularProgress,
  Card, CardContent, CardMedia, IconButton
} from '@mui/material';
import {
  SkipPrevious as SkipPreviousIcon,
  PlayArrow as PlayArrowIcon,
  SkipNext as SkipNextIcon
} from '@mui/icons-material';

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

  // 1. Fetch Data
  useEffect(() => {
    setLoading(true);
    axios.get(ASSET_API_URL)
      .then((res) => {
        if (res.data.success && res.data.assets?.length > 0) {
          setAssetData(res.data.assets);
        } else {
          setError(res.data.message || 'No records found.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Network error: Unable to load asset images.');
        setLoading(false);
      });
  }, []);

  // 2. Performance: Preload Next Image
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

  useEffect(() => {
    if (loading || error || assetData.length <= 1 || !isPlaying) return;
    const timer = setInterval(handleNext, ROTATION_INTERVAL_SEC * 1000);
    return () => clearInterval(timer);
  }, [loading, error, assetData.length, isPlaying, handleNext]);

  if (loading) {
    return (
      <Card sx={{ display: 'flex', bgcolor: BRAND.dark, borderRadius: '20px', minHeight: '500px' }}>
        <Box sx={{ flex: 1, p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
        borderRadius: '24px', // Softer rounded corners
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        border: '1px solid rgba(236, 155, 20, 0.1)', // Subtle gold border
        mb: 6,
      }}
    >
      {/* LEFT SIDE: PHOTO PANE */}
      <Box
        sx={{
          position: 'relative',
          width: { xs: '100%', md: '65%' },
          height: { xs: '350px', md: '600px' }, // Increased height to prevent cropping
          bgcolor: '#000',
          overflow: 'hidden',
          // Performance: smoother transitions
          '& img': {
             transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease-in-out',
          }
        }}
      >
        {assetData.map((asset, index) => (
          <Box
            key={asset.id || index}
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 1 : 0,
              visibility: index === currentIndex ? 'visible' : 'hidden',
              transition: 'opacity 0.8s ease-in-out',
            }}
          >
            <CardMedia
              component="img"
              image={asset.image_url}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                transform: index === currentIndex ? 'scale(1.05)' : 'scale(1.15)',
              }}
            />
            {/* Dark Overlay for depth */}
            <Box sx={{
              position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%',
              background: 'linear-gradient(to top, rgba(2,21,15,0.8), transparent)',
              zIndex: 2
            }} />
          </Box>
        ))}
      </Box>

      {/* RIGHT SIDE: CONTENT PANE */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        width: { xs: '100%', md: '35%' },
        borderLeft: { md: '1px solid rgba(255,255,255,0.05)' } 
      }}>
        <CardContent sx={{ 
          flex: '1 0 auto', 
          p: { xs: 4, md: 6 }, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center' 
        }}>
          <Typography 
            variant="overline" 
            sx={{ color: BRAND.gold, fontWeight: 700, letterSpacing: 2, mb: 1 }}
          >
            Golden Generation Sacco
          </Typography>
          <Typography 
            variant="h3" 
            sx={{ 
              color: BRAND.light, 
              fontWeight: 900, 
              mb: 3, 
              fontSize: { md: '2.5rem', xs: '1.8rem' },
              lineHeight: 1.1
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
            Empowering your growth. Acquire equipment, machinery, or tools today. 
            Repay in affordable installments while your asset works for you.
          </Typography>
        </CardContent>

        {/* CONTROLS - Positioned at bottom right for ergonomic feel */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          px: 4, 
          pb: 4, 
          justifyContent: 'flex-start',
          gap: 2
        }}>
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