import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Link, Grid, Zoom, Skeleton
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

// --- CONFIGURATION ---
const ASSET_API_URL = '/asset-financing';
const ROTATION_INTERVAL_SEC = 12;

// --- SACCO BRANDING ---
const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
  success: '#25D366',
  error: '#EF5350'
};

// --- STYLED COMPONENTS ---

const CardContainer = ({ children }) => (
  <Box
    sx={{
      bgcolor: BRAND.dark,
      color: BRAND.light,
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      border: `1px solid rgba(255,255,255,0.05)`,
      transition: 'all 0.4s ease',
      mb: 6,
      '&:hover': {
        boxShadow: `0 15px 45px rgba(236, 155, 20, 0.15)`,
        transform: 'translateY(-2px)'
      }
    }}
  >
    {children}
  </Box>
);

const PhotoPane = ({ children }) => (
  <Grid
    item
    xs={12}
    md={8}
    sx={{
      p: 0,
      m: 0,
      position: 'relative',
      height: { xs: '350px', md: '550px' },
    }}
  >
    {children}
  </Grid>
);

const ContentPane = ({ children }) => (
  <Grid
    item
    xs={12}
    md={4}
    sx={{
      p: { xs: 4, md: 6 },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      bgcolor: BRAND.dark,
    }}
  >
    {children}
  </Grid>
);

const EtchedClawIcon = () => (
  <Box sx={{ mb: 3 }}>
    <Box
      component="img"
      src="https://res.cloudinary.com/djydkcx01/image/upload/v1740996843/WhatsApp_Image_2025-03-03_at_12.59.13_PM-removebg-preview_scgclq.png"
      alt="Sacco Icon"
      sx={{
        width: '55px',
        opacity: 0.9,
        filter: 'sepia(100%) saturate(400%) hue-rotate(330deg) brightness(1.2)'
      }}
    />
  </Box>
);

// --- MAIN COMPONENT ---

const AssetFinancing = () => {
  const [assetData, setAssetData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextImageUrl, setNextImageUrl] = useState(null); 
  const preloadRef = useRef(new Image());

  // 1. Fetch Data from your specified route
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(ASSET_API_URL);
        const json = await response.json();

        if (json.success && json.assets && json.assets.length > 0) {
          setAssetData(json.assets);
        } else {
          setError(json.message || 'No financing records found.');
        }
      } catch (e) {
        setError('Network error: Unable to load asset images.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Preload and Rotation Logic
  useEffect(() => {
    if (loading || error || assetData.length <= 1) return;

    const nextIdx = (currentIndex + 1) % assetData.length;
    const preloadUrl = assetData[nextIdx].image_url;

    const handlePreloadLoad = () => {
      setNextImageUrl(preloadUrl); 
    };

    preloadRef.current = new Image();
    preloadRef.current.onload = handlePreloadLoad;
    preloadRef.current.src = preloadUrl;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % assetData.length);
      setNextImageUrl(null);
    }, ROTATION_INTERVAL_SEC * 1000);

    return () => {
      clearInterval(timer);
      if (preloadRef.current) preloadRef.current.onload = null;
    };
  }, [currentIndex, assetData, loading, error]);

  if (loading) {
    return (
      <CardContainer>
        <Grid container>
          <PhotoPane><Skeleton variant="rectangular" width="100%" height="100%" /></PhotoPane>
          <ContentPane><Skeleton variant="rectangular" width="100%" height="300px" /></ContentPane>
        </Grid>
      </CardContainer>
    );
  }

  if (error) {
    return (
      <CardContainer>
        <Box sx={{ p: 8, textAlign: 'center' }}>
          <Typography sx={{ color: BRAND.error, mb: 1 }}>{error}</Typography>
        </Box>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      {/* Hidden preloader for linting and performance */}
      {nextImageUrl && <Box component="img" src={nextImageUrl} sx={{ display: 'none' }} alt="" />}

      <Grid container spacing={0}>
        {/* --- LEFT: PHOTO PANE (Dynamic AssetUrl) --- */}
        <PhotoPane>
          {assetData.map((asset, index) => (
            <Zoom
              key={asset.id}
              in={index === currentIndex}
              timeout={{ enter: 1200, exit: 900 }}
              mountOnEnter
              unmountOnExit
            >
              <Box
                component="img"
                src={asset.image_url}
                alt="Golden Generation Asset Financing"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.85)'
                }}
              />
            </Zoom>
          ))}
          {/* Brand Overlay */}
          <Box sx={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: `linear-gradient(to right, ${BRAND.dark}, rgba(2, 21, 15, 0.1))`
          }} />
        </PhotoPane>

        {/* --- RIGHT: CONTENT PANE (Updated Wordings) --- */}
        <ContentPane>
          <Box>
            <EtchedClawIcon />
            
            <Typography 
              variant="h3" 
              sx={{ 
                color: BRAND.gold, 
                fontWeight: 900, 
                mb: 4, 
                fontSize: { xs: '2rem', md: '2.4rem' }, 
                lineHeight: 1.2,
                textTransform: 'uppercase'
              }}
            >
              Asset Financing
            </Typography>

            <Typography 
              sx={{ 
                color: BRAND.light, 
                fontSize: '0.95rem', 
                lineHeight: 1.8, 
                mb: 6,
                fontWeight: 400,
                opacity: 0.9
              }}
            >
              Acquire the equipment, machinery, or tools you need today through our 
              flexible asset financing. We fund your purchase and use the asset as 
              security while you repay in affordable installments — giving you full 
              ownership once the loan is cleared.
            </Typography>

            <Link
              href="/products/asset-financing"
              sx={{
                color: BRAND.gold,
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                transition: '0.3s',
                '&:hover': { color: BRAND.light, transform: 'translateX(8px)' }
              }}
            >
              Learn more or apply now <ArrowForward sx={{ fontSize: '1.2rem' }} />
            </Link>
          </Box>
        </ContentPane>
      </Grid>
    </CardContainer>
  );
};

export default AssetFinancing;