import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Card, IconButton } from '@mui/material';
import { SkipPrevious, SkipNext } from '@mui/icons-material';
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

  // 1. Data Fetching
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

  // 2. Progress Bar Logic
  useEffect(() => {
    if (loading || assetData.length <= 1) return;
    
    const step = 100 / (ROTATION_INTERVAL_MS / 100);
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) return 0;
        return oldProgress + step;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentIndex, loading, assetData.length]);

  useEffect(() => {
    if (progress >= 100) handleNext();
  }, [progress, handleNext]);

  // 3. Swipe Gestures
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
      <CircularProgress sx={{ color: BRAND.gold }} />
    </Box>
  );

  return (
    <Card
      {...handlers}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        bgcolor: BRAND.dark,
        borderRadius: { xs: '16px', md: '32px' },
        overflow: 'hidden',
        position: 'relative',
        minHeight: { md: '550px' },
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.05)',
        mb: 6,
      }}
    >
      {/* LEFT: IMAGE CANVAS */}
      <Box sx={{ position: 'relative', width: { xs: '100%', md: '60%' }, height: { xs: '400px', md: 'auto' }, overflow: 'hidden' }}>
        {assetData.map((asset, index) => (
          <Box
            key={asset.id || index}
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: index === currentIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out, transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: index === currentIndex ? 'scale(1.05)' : 'scale(1.2)',
              zIndex: index === currentIndex ? 1 : 0,
            }}
          >
            <Box
              component="img"
              src={asset.image_url}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Box sx={{
              display: { xs: 'block', md: 'none' },
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '60%',
              background: 'linear-gradient(to top, #02150F 10%, transparent 100%)',
            }} />
          </Box>
        ))}
      </Box>

      {/* RIGHT: CONTENT */}
      <Box sx={{ 
        width: { xs: '100%', md: '40%' }, 
        p: { xs: 4, md: 6 }, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        mt: { xs: -10, md: 0 }
      }}>
        
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '4px', 
          bgcolor: 'rgba(255,255,255,0.1)' 
        }}>
          <Box sx={{ 
            width: `${progress}%`, 
            height: '100%', 
            bgcolor: BRAND.gold, 
            transition: 'width 0.1s linear',
            boxShadow: `0 0 10px ${BRAND.gold}`
          }} />
        </Box>

        <Typography 
          variant="overline" 
          sx={{ color: BRAND.gold, fontWeight: 700, letterSpacing: '0.3em', mb: 1, display: 'block' }}
        >
          GROW WITH US
        </Typography>

        <Typography 
          variant="h2" 
          sx={{ 
            color: BRAND.light, 
            fontWeight: 800, 
            fontSize: { xs: '2.2rem', md: '3rem' },
            lineHeight: 1.1,
            mb: 3,
            textShadow: '2px 4px 10px rgba(0,0,0,0.3)'
          }}
        >
          ASSET <br />
          <span style={{ color: BRAND.gold, filter: 'drop-shadow(0 0 8px rgba(236, 155, 20, 0.3))' }}>
            FINANCING
          </span>
        </Typography>

        <Typography sx={{ 
          color: 'rgba(244, 244, 244, 0.8)', 
          fontSize: '1.1rem', 
          lineHeight: 1.7, 
          mb: 5,
          fontWeight: 300
        }}>
          <strong>Empower your growth</strong> with hassle-free asset financing. 
          From commercial vehicles to industrial machinery—we bridge the gap 
          between your <strong>ambition and ownership.</strong>
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton 
            onClick={handlePrev}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.05)', 
              color: BRAND.light,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark }
            }}
          >
            <SkipPrevious />
          </IconButton>
          <IconButton 
             onClick={handleNext}
             sx={{ 
               bgcolor: 'rgba(255,255,255,0.05)', 
               color: BRAND.light,
               backdropFilter: 'blur(10px)',
               border: '1px solid rgba(255,255,255,0.1)',
               '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark }
             }}
          >
            <SkipNext />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default AssetFinancing;