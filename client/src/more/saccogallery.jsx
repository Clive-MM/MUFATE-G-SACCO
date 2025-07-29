import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  Box,
  CircularProgress,
  CardContent
} from '@mui/material';

const SaccoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/gallery')
      .then((res) => {
        const gallery = res.data.gallery || [];
        setPhotos(gallery);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Failed to load gallery:', err);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, sm: 6 }, px: { xs: 1, sm: 3 } }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        color='#ffffff'
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          fontWeight: 'bold'
        }}
      >
        GALLERY
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={5}>
          <CircularProgress />
        </Box>
      ) : (
        <LightGallery speed={500} plugins={[]} elementClassNames="custom-gallery">
          <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
            {photos.map((photo, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    height: '100%',
                    backgroundColor: '#fefefe',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.02)' }
                  }}
                >
                  <CardActionArea
                    component="div"
                    data-src={photo.ImageURL}
                    data-sub-html={`<div style="text-align: center;"><h4>${photo.Title}</h4><p>${photo.Description}</p></div>`}
                  >
                    <CardMedia
                      component="img"
                      image={photo.ImageURL}
                      alt={photo.Title}
                      sx={{
                        width: '100%',
                        height: { xs: 200, sm: 250, md: 300 },
                        objectFit: 'contain',
                        padding: 1,
                        backgroundColor: '#fff'
                      }}
                    />
                  </CardActionArea>

                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      align="center"
                      sx={{
                        color: 'blue',
                        fontWeight: 500,
                        fontSize: { xs: '0.85rem', sm: '1rem' }
                      }}
                    >
                      {photo.Title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </LightGallery>
      )}
    </Container>
  );
};

export default SaccoGallery;



