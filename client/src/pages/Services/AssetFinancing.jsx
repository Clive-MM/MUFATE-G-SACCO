import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Link, Grid, Tooltip, Zoom, Skeleton
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

// --- CONFIGURATION ---

// Define API endpoint (adjust as needed for your environment)
const ASSET_API_URL = '/asset-financing';

// Rotate background images every N seconds
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

// --- STYLED COMPONENTS (SYSTEM APPROACH) ---

const CardContainer = ({ children }) => (
  <Box
    sx={{
      bgcolor: BRAND.dark,
      color: BRAND.light,
      borderRadius: '16px',
      overflow: 'hidden', // Required for image to follow rounded corners
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
    md={8} // Occupies 8/12 = 2/3 of the width
    sx={{
      p: 0,
      m: 0,
      position: 'relative',
      height: { xs: '300px', md: '500px' }, // Set explicit height
    }}
  >
    {children}
  </Grid>
);

const ContentPane = ({ children }) => (
  <Grid
    item
    xs={12}
    md={4} // Occupies 4/12 = 1/3 of the width
    sx={{
      p: { xs: 4, md: 6 },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    {children}
  </Grid>
);

// Etched Claw Icon Component
const EtchedClawIcon = () => (
  <Box sx={{ mb: 4 }}>
    <img
      src="path_to_your_etched_claw_icon.svg" // REPLACE THIS with your icon URL or import
      alt="Sacco Icon"
      style={{
        width: '60px',
        opacity: 0.8,
        filter: 'sepia(100%) saturate(300%) hue-rotate(300deg) brightness(1.1)' // Forces 'etched gold' look
      }}
    />
  </Box>
);

// Feature Item Styling
const FeatureTitle = ({ children }) => (
  <Typography variant="subtitle1" sx={{ color: BRAND.light, fontWeight: 700, mt: 3, mb: 1, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
    {children}
  </Typography>
);

const FeatureText = ({ children }) => (
  <Typography sx={{ color: BRAND.textMuted, fontSize: '0.88rem', lineHeight: 1.8, mb: 2 }}>
    {children}
  </Typography>
);

// --- MAIN COMPONENT ---

const AssetFinancing = () => {
  const [assetData, setAssetData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextImageUrl, setNextImageUrl] = useState(null); // URL for preloaded image
  const preloadRef = useRef(new Image()); // Ref to keep preload image object alive

  // 1. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(ASSET_API_URL);
        const json = await response.json();

        if (json.success && json.assets && json.assets.length > 0) {
          // Keep all asset data, but use 'image_url' (as 'AssetUrl' mapped by backend)
          setAssetData(json.assets);
        } else {
          setError(json.message || 'Failed to load asset data.');
        }
      } catch (e) {
        setError('A network error occurred. Please try again later.');
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. Preload and Rotation Logic
  useEffect(() => {
    // Basic dependency check
    if (loading || error || assetData.length <= 1) return;

    // A. Preload the NEXT image
    const nextIdx = (currentIndex + 1) % assetData.length;
    const preloadUrl = assetData[nextIdx].image_url;

    const handlePreloadLoad = () => {
      setNextImageUrl(preloadUrl); // Next image is ready
    };

    // Keep the preload image object referenced
    preloadRef.current = new Image();
    preloadRef.current.onload = handlePreloadLoad;
    preloadRef.current.src = preloadUrl;

    // B. Set up rotation timer
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % assetData.length);
      // Reset preload for the new next image
      setNextImageUrl(null);
    }, ROTATION_INTERVAL_SEC * 1000);

    return () => {
      // Cleanup on unmount/re-run
      clearInterval(timer);
      if (preloadRef.current) {
        preloadRef.current.onload = null;
        preloadRef.current = null;
      }
    };
  }, [currentIndex, assetData, loading, error]);

  // Handle various loading/error states gracefully
  if (loading) {
    return (
      <CardContainer>
        <Grid container>
          <PhotoPane><Skeleton variant="rectangular" width="100%" height="100%" animation="wave" /></PhotoPane>
          <ContentPane><Skeleton variant="rectangular" width="100%" height="400px" /></ContentPane>
        </Grid>
      </CardContainer>
    );
  }

  if (error) {
    return (
      <CardContainer>
        <Box sx={{ p: 6, textAlign: 'center' }}>
          <Typography sx={{ color: BRAND.error, fontSize: '1.1rem', mb: 2 }}>
            Unable to Display Featured Assets
          </Typography>
          <Typography sx={{ color: BRAND.textMuted, fontSize: '0.88rem' }}>
            {error}
          </Typography>
        </Box>
      </CardContainer>
    );
  }

  // Define the image to display (current or fallback)
  const currentAsset = assetData[currentIndex];
  const displayImageUrl = currentAsset?.image_url || null;

  return (
    <CardContainer>
      <Grid container spacing={0}>

        {/* --- LEFT: PHOTO PANE (2/3) --- */}
        <PhotoPane>
          {/* Animated Background Images */}
          {assetData.map((asset, index) => (
            <Zoom
              key={asset.id}
              in={index === currentIndex} // Only current is 'in'
              timeout={{ enter: 1000, exit: 800 }}
              mountOnEnter
              unmountOnExit
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.9, // Add slight overlay feel
              }}
            >
              <img
                src={asset.image_url}
                alt={`Asset Financing Example - Financer: ${asset.financer}`}
                loading={index === 0 ? "eager" : "lazy"} // Eager load first one
              />
            </Zoom>
          ))}

          {/* Fallback image (e.g., if AssetUrl is broken) */}
          {!displayImageUrl && (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          )}

          {/* Background Overlay (Darken photo for better contrast on text if needed, can remove) */}
          <Box sx={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: `linear-gradient(to right, ${BRAND.dark}, rgba(2, 21, 15, 0.4))`
          }} />
        </PhotoPane>

        {/* --- RIGHT: CONTENT PANE (1/3) --- */}
        <ContentPane>
          <Box sx={{ flexGrow: 1 }}>
            {/* 1. Etched Claw Icon */}
            <EtchedClawIcon />

            {/* 2. Main Title */}
            <Typography
              variant="h3"
              sx={{
                color: BRAND.gold,
                fontWeight: 900,
                mb: 6,
                fontSize: { xs: '2.4rem', md: '2.8rem' },
                lineHeight: 1.2,
              }}
            >
              Asset Financing
            </Typography>

            {/* 3. Feature Stack */}
            <FeatureTitle>Tailored Solutions</FeatureTitle>
            <FeatureText>
              Enhance asset utilization and constructing options. We fund for business growth.
            </FeatureText>

            <FeatureTitle>Quick Approvals</FeatureTitle>
            <FeatureText>
              Streamlined processes for smaller asset acquisitions. Fast decisions for timely purchases.
            </FeatureText>

            <FeatureTitle>Flexible Terms</FeatureTitle>
            <FeatureText>
              Affordable installments customized to cash flows. Get estimates with load and approvals.
            </FeatureText>
          </Box>

          {/* 4. Gold Call-to-Action Link */}
          <Box sx={{ mt: 'auto', pt: 6, textAlign: 'left' }}>
            <Link
              href="#"
              sx={{
                color: BRAND.gold,
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                p: '10px 0',
                transition: '0.3s',
                '&:hover': {
                  color: BRAND.light,
                  transform: 'translateX(8px)'
                }
              }}
            >
              Learn more or apply now <ArrowForward sx={{ fontSize: '1.3rem' }} />
            </Link>
          </Box>
        </ContentPane>

      </Grid>
    </CardContainer>
  );
};

export default AssetFinancing;