import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Card, IconButton, Button, Skeleton } from '@mui/material';
import { SkipPrevious, SkipNext, ArrowForward } from '@mui/icons-material';
import { useSwipeable } from 'react-swipeable';

// --- CONFIGURATION ---
const ASSET_API_URL = `${process.env.REACT_APP_API_BASE_URL}/asset-financing`;
const ROTATION_INTERVAL_MS = 6000; 

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
};

const AssetFinancing = () => {
  const [assetData, setAssetData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios.get(ASSET_API_URL, { cancelToken: source.token })
      .then((res) => {
        if (res.data.success) setAssetData(res.data.assets);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => source.cancel();
  }, []);

  const handleNext = useCallback(() => {
    if (assetData.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % assetData.length);
    setProgress(0);
  }, [assetData.length]);

  const handlePrev = useCallback(() => {
    if (assetData.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? assetData.length - 1 : prev - 1));
    setProgress(0);
  }, [assetData.length]);

  useEffect(() => {
    if (loading || assetData.length <= 1) return;
    const step = 100 / (ROTATION_INTERVAL_MS / 100);
    const timer = setInterval(() => {
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + step));
    }, 100);
    return () => clearInterval(timer);
  }, [currentIndex, loading, assetData.length]);

  useEffect(() => {
    if (progress >= 100) handleNext();
  }, [progress, handleNext]);

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  if (loading) return (
    <Box sx={{ width: '100%', height: { xs: '600px', md: '550px' }, bgcolor: BRAND.dark, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <Skeleton variant="rectangular" sx={{ width: { xs: '100%', md: '60%' }, height: '100%', bgcolor: 'rgba(255,255,255,0.05)' }} />
      <Box sx={{ p: 6, width: { xs: '100%', md: '40%' } }}>
        <Skeleton width="40%" sx={{ bgcolor: 'rgba(255,255,255,0.05)', mb: 2 }} />
        <Skeleton variant="text" height={60} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Skeleton variant="text" height={60} width="80%" sx={{ bgcolor: 'rgba(255,255,255,0.05)', mb: 4 }} />
        <Skeleton variant="rectangular" height={50} width={150} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
      </Box>
    </Box>
  );

  return (
    <Card
      {...handlers}
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        bgcolor: BRAND.dark,
        borderRadius: 0,
        overflow: 'hidden',
        position: 'relative',
        minHeight: { xs: 'auto', md: '550px' },
        width: '100%',
        border: 'none',
      }}
    >
      {/* IMAGE CANVAS */}
      <Box sx={{ 
        position: 'relative', 
        width: { xs: '100%', md: '60%' }, 
        aspectRatio: { xs: '4/3', md: 'auto' }, 
        overflow: 'hidden',
        bgcolor: '#000' // Prevents white flash between transitions
      }}>
        {assetData.map((asset, index) => (
          <Box
            key={asset.id || index}
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: index === currentIndex ? 1 : 0,
              // Removed scale(1.2) for mobile performance, used simple opacity/subtle scale
              transition: 'opacity 0.8s ease-in-out',
              zIndex: index === currentIndex ? 1 : 0,
            }}
          >
            <Box
              component="img"
              src={asset.image_url}
              alt={asset.title || "Asset Financing"}
              loading={index === 0 ? "eager" : "lazy"}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Box sx={{
              display: { xs: 'block', md: 'none' },
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '50%',
              background: 'linear-gradient(to top, #02150F 20%, transparent 100%)',
            }} />
          </Box>
        ))}
      </Box>

      {/* CONTENT SECTION */}
      <Box sx={{ 
        width: { xs: '100%', md: '40%' }, 
        p: { xs: 4, md: 6 }, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        position: 'relative',
        mt: { xs: -8, md: 0 },
        zIndex: 10,
      }}>
        
        {/* Progress Bar - Subtle & Global */}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '3px', bgcolor: 'rgba(255,255,255,0.05)' }}>
          <Box sx={{ 
            width: `${progress}%`, 
            height: '100%', 
            bgcolor: BRAND.gold, 
            transition: 'width 0.1s linear',
            boxShadow: `0 0 8px ${BRAND.gold}`
          }} />
        </Box>

        <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 700, letterSpacing: '0.2em', mb: 1 }}>
          GROW WITH US
        </Typography>

        <Typography variant="h2" sx={{ 
          color: BRAND.light, fontWeight: 800, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1, mb: 2,
        }}>
          ASSET <span style={{ color: BRAND.gold }}>FINANCING</span>
        </Typography>

        <Typography sx={{ color: 'rgba(244, 244, 244, 0.7)', fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.6, mb: 4, fontWeight: 300 }}>
          <strong>Empower your growth</strong> with hassle-free asset financing. 
          We bridge the gap between your <strong>ambition and ownership.</strong>
        </Typography>

        {/* CTA & NAVIGATION */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}>
          
          <Button 
            variant="contained" 
            endIcon={<ArrowForward />}
            sx={{ 
              bgcolor: BRAND.gold, 
              color: BRAND.dark, 
              fontWeight: 700, 
              px: 4, py: 1.5,
              borderRadius: '4px',
              '&:hover': { bgcolor: BRAND.light }
            }}
          >
            GET STARTED
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={handlePrev} size="large" sx={{ border: '1px solid rgba(255,255,255,0.1)', color: BRAND.light }}>
              <SkipPrevious fontSize="small" />
            </IconButton>
            
            <Typography sx={{ color: BRAND.gold, fontFamily: 'monospace', fontWeight: 700 }}>
              {String(currentIndex + 1).padStart(2, '0')}
            </Typography>

            <IconButton onClick={handleNext} size="large" sx={{ border: '1px solid rgba(255,255,255,0.1)', color: BRAND.light }}>
              <SkipNext fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default AssetFinancing;