// Removed useRef from the import to clear the linting error
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, Link, Grid, Zoom, Skeleton, CircularProgress
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

// --- CONFIGURATION ---
const ASSET_API_URL = `${process.env.REACT_APP_API_BASE_URL}/asset-financing`;
const ROTATION_INTERVAL_SEC = 8; 

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
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
      mb: 6,
    }}
  >
    {children}
  </Box>
);

const PhotoPane = ({ children }) => (
  <Grid
    item
    xs={12}
    md={7} 
    sx={{
      p: 0,
      position: 'relative',
      height: { xs: '300px', md: '500px' },
      overflow: 'hidden',
    }}
  >
    {children}
  </Grid>
);

const ContentPane = ({ children }) => (
  <Grid
    item
    xs={12}
    md={5}
    sx={{
      p: { xs: 4, md: 6 },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      bgcolor: BRAND.dark,
      borderLeft: { md: `1px solid rgba(255,255,255,0.05)` }
    }}
  >
    {children}
  </Grid>
);

const AssetFinancing = () => {
  const [assetData, setAssetData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (loading || error || assetData.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % assetData.length);
    }, ROTATION_INTERVAL_SEC * 1000);

    return () => clearInterval(timer);
  }, [assetData, loading, error]);

  if (loading) {
    return (
      <CardContainer>
        <Grid container>
          <PhotoPane>
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress sx={{ color: BRAND.gold }} />
            </Box>
          </PhotoPane>
          <ContentPane>
            <Skeleton variant="text" width="60%" height={40} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
            <Skeleton variant="rectangular" width="100%" height={150} sx={{ mt: 2, bgcolor: 'rgba(255,255,255,0.05)' }} />
          </ContentPane>
        </Grid>
      </CardContainer>
    );
  }

  if (error) {
    return (
      <CardContainer>
        <Box sx={{ p: 8, textAlign: 'center' }}>
          <Typography sx={{ color: '#EF5350', mb: 1 }}>{error}</Typography>
        </Box>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <Grid container direction="row">
        <PhotoPane>
          {assetData.map((asset, index) => (
            <Zoom
              key={asset.id || index}
              in={index === currentIndex}
              timeout={{ enter: 1000, exit: 800 }}
              mountOnEnter
              unmountOnExit
            >
              <Box
                component="img"
                src={asset.image_url}
                alt="Financing Asset"
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Zoom>
          ))}
          <Box sx={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: `linear-gradient(to right, transparent 70%, ${BRAND.dark} 100%)`,
            zIndex: 2
          }} />
        </PhotoPane>

        <ContentPane>
          <Typography 
            variant="h4" 
            sx={{ 
              color: BRAND.gold, 
              fontWeight: 800, 
              mb: 3, 
              textTransform: 'uppercase'
            }}
          >
            Asset Financing
          </Typography>

          <Typography sx={{ color: BRAND.light, mb: 4, lineHeight: 1.8, opacity: 0.9 }}>
            Acquire the equipment, machinery, or tools you need today through our 
            flexible asset financing. We fund your purchase and use the asset as 
            security while you repay in affordable installments.
          </Typography>

          <Link
            href="/products/asset-financing"
            sx={{
              color: BRAND.gold,
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              '&:hover': { transform: 'translateX(5px)', transition: '0.3s' }
            }}
          >
            Apply Now <ArrowForward />
          </Link>
        </ContentPane>
      </Grid>
    </CardContainer>
  );
};

export default AssetFinancing;